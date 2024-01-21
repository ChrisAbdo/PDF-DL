import { z } from "zod";
import puppeteer from "puppeteer";
import { put } from "@vercel/blob";

console.log("🚀 Starting port " + process.env.PORT);

const headers = {
  base: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "GET, POST",
  },
};
const schema = z.object({
  url: z.string().url(),
});

Bun.serve({
  hostname: "::",
  port: process.env.PORT || 3001,
  fetch: async (request: Request) => {
    try {
      let url = "";

      if (request.method === "GET") {
        const { searchParams } = new URL(request.url);
        url = searchParams.get("url") as string;

        if (!url)
          return new Response(
            "Welcome to PDFDL API!\n\nThe rest is simple: just put ?url=DOMAIN_HERE in the URL.\n\nFor example, https://sitegrab-production.up.railway.app/?url=google.com"
          );
      } else {
        const body = (await request.json()) as any;
        url = body.url;
        if (!url) return new Response('Pass { "url": "example.com" } in body');
      }

      schema.parse({ url });

      console.log(`📁 Downloading ${url}`);

      // Connect to Browserless
      const browser = await puppeteer.connect({
        browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.BROWSERLESS_TOKEN}`,
      });

      const page = await browser.newPage();
      await page.goto(url, { waitUntil: "networkidle2" });
      const pdfBuffer = await page.pdf({ format: "A4" });

      await browser.close();

      const fileName = `${encodeURIComponent(new URL(url).hostname)}.pdf`;
      //   @ts-ignore
      const uploadResponse = await put(fileName, pdfBuffer, {
        access: "public",
      });

      // Check if the upload is successful and return the URL
      if (uploadResponse.url) {
        return new Response(JSON.stringify({ url: uploadResponse.url }), {
          headers: {
            "Content-Type": "application/json",
            ...headers.base,
          },
          status: 200,
        });
      } else {
        throw new Error("Failed to upload PDF");
      }
    } catch (error) {
      console.error(error);
      return new Response("Failed to generate or upload PDF", { status: 500 });
    }
  },
});
