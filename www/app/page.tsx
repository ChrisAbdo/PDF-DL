import React from "react"

import Examples from "@/components/examples"
import { FadeIn } from "@/components/fade-in"
import Navbar from "@/components/navbar"
import PDFForm from "@/components/pdf-form"

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Navbar />
      <div className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="z-50 flex flex-col items-center justify-center space-y-4 bg-background">
            <div className="space-y-2 bg-background text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Turn any page into a PDF
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Enter the URL of the page you want to convert to PDF.
              </p>
            </div>
            <div className="w-full max-w-md">
              <p className="text-center">view some examples &darr;</p>
              <Examples />
              <div className="mt-6">
                <PDFForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
