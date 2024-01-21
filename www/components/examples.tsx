import React from "react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"

const exampleBadges = [
  {
    name: "chrisabdo.dev",
    href: "https://gthn6njyntpqcly4.public.blob.vercel-storage.com/chrisabdo.dev-2G91sP4jiGcsq5PKxmjXME2r41QuKs.pdf",
  },
  {
    name: "google.com",
    href: "https://gthn6njyntpqcly4.public.blob.vercel-storage.com/www.google.com-JHD5lS6xPXQtjU1ZDMS12dLRXHfoql.pdf",
  },
  {
    name: "youtube.com",
    href: "https://gthn6njyntpqcly4.public.blob.vercel-storage.com/www.youtube.com-WMHvYWygeiJEGWL2O2WrX4BsLiAsZ8.pdf",
  },
]

export default function Examples() {
  return (
    <div className="flex items-center justify-center gap-2">
      {exampleBadges.map((badge) => (
        <Link
          href={badge.href}
          key={badge.name}
          rel="noopener noreferrer"
          target="_blank"
          className="z-50"
        >
          <Badge variant="secondary">{badge.name}</Badge>
        </Link>
      ))}
    </div>
  )
}
