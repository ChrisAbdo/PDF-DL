"use client"

import React from "react"
import { toast } from "sonner"

import { apiUrl, placeholder } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Home() {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [pdfUrl, setPdfUrl] = React.useState<string>("")
  const [endpoint, setEndpoint] = React.useState<string>(
    `${apiUrl}?url=${placeholder}`
  )
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
    <div>
      Endpoint: {endpoint}
      <br />
      <form
        onSubmit={handleSubmit}
        onChange={({ target }: any) => {
          setEndpoint((prev) => {
            const curr = new URL(prev)
            const params = new URLSearchParams(curr.search)
            params.set(target.name, target.checked || target.value)
            if (target.type == "checkbox" && !target.checked)
              params.delete(target.name)

            curr.search = params.toString()

            return curr.href
          })
        }}
        className="flex w-full flex-col space-y-2 sm:space-y-4"
      >
        <Input
          ref={inputRef}
          name="url"
          type="text"
          placeholder="ex: https://chrisabdo.dev"
          className="bg-muted"
          autoComplete="off"
          spellCheck={false}
        />
        {loading ? (
          <Button disabled={loading} className="min-w-[100px]">
            loading...
          </Button>
        ) : (
          <Button type="submit" className="min-w-[100px]">
            Screenshot
          </Button>
        )}

        {pdfUrl && (
          <>
            <pre className="whitespace-pre-wrap font-mono text-xs">
              <code className="language-html">{pdfUrl}</code>
            </pre>
          </>
        )}
      </form>
    </div>
  )
}
