"use client"

import React from "react"
import Link from "next/link"
import { DownloadIcon } from "@radix-ui/react-icons"
import { toast } from "sonner"

import { apiUrl, placeholder } from "@/lib/constants"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function PDFForm() {
  const [endpoint, setEndpoint] = React.useState<string>(
    `${apiUrl}?url=${placeholder}`
  )
  const [loading, setLoading] = React.useState<boolean>(false)
  const [pdfUrl, setPdfUrl] = React.useState<string>("")

  const inputRef = React.useRef<HTMLInputElement>(null)

  async function handleSubmit(e: any) {
    e.preventDefault()
    setLoading(true)

    const start = Date.now()

    try {
      const res = await fetch(endpoint)
      const json = await res.json() // Parse the response as JSON
      const obj = json.url // Extract the URL from the JSON response

      const end = Date.now() - start

      setPdfUrl(obj) // Set the PDF URL to the extracted URL

      toast.success(`Done in ${end / 1000} s`)
    } catch (error: any) {
      toast.error(error.message || "Something went wrong")
    }

    setLoading(false)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        onChange={({ target }: any) => {
          setEndpoint((prev: any) => {
            const curr = new URL(prev)
            const params = new URLSearchParams(curr.search)
            params.set(target.name, target.checked || target.value)
            if (target.type == "checkbox" && !target.checked)
              params.delete(target.name)

            curr.search = params.toString()

            return curr.href
          })
        }}
        className="flex space-x-2"
      >
        <Input
          ref={inputRef}
          name="url"
          type="text"
          placeholder="ex: https://chrisabdo.dev"
          className="z-50 max-w-xl flex-1 bg-muted"
          autoComplete="off"
          spellCheck={false}
        />
        {loading ? (
          <Button disabled={loading} className="min-w-[100px]">
            loading...
          </Button>
        ) : (
          <Button type="submit" className="z-50 min-w-[100px]">
            Convert
          </Button>
        )}
      </form>
      {pdfUrl && (
        <>
          <Alert className="mt-4">
            <DownloadIcon className="h-4 w-4" />
            <AlertTitle>Your PDF is now available for download!</AlertTitle>
            <AlertDescription>
              <Link
                href={pdfUrl}
                className="hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                {pdfUrl}
              </Link>
              <br />
              <div className="mt-2 space-x-2">
                <Link href={pdfUrl} rel="noopener noreferrer" target="_blank">
                  <Button>Download / View</Button>
                </Link>
              </div>
            </AlertDescription>
          </Alert>
        </>
      )}
    </>
  )
}
