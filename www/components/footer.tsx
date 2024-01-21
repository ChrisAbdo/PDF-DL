import React from "react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="absolute inset-x-0 bottom-0 z-50 flex h-16 items-center p-6 lg:px-8">
      built by&nbsp;
      <Link
        href="https://x.com/chrisjabdo"
        className="hover:underline"
        rel="noopener noreferrer"
        target="_blank"
      >
        Chris Abdo
      </Link>
    </footer>
  )
}
