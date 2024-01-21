import { z } from "zod";
import { createWriteStream } from "fs";
import ytdl from "ytdl-core";

console.log("🚀 Starting port " + process.env.PORT);

const schema = z.object({
  url: z.string(),
});

ytdl("https://www.youtube.com/watch?v=dQw4w9WgXcQ").pipe(
  createWriteStream("secret-video-do-not-download.mp4")
);

Bun.serve({
  hostname: "::",
  port: process.env.PORT || 3001,
  fetch: async (request: Request) => {
    return new Response("Hello via Bun2!");
  },
});
