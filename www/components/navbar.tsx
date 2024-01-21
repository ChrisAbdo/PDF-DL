import React from "react"
import Link from "next/link"
import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons"

import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"

export default function Navbar() {
  const socials = [
    {
      name: "GitHub",
      href: "https://github.com/ChrisAbdo",
      icon: <GitHubLogoIcon />,
    },
    {
      name: "X",
      href: "https://x.com/chrisjabdo",
      icon: <TwitterLogoIcon />,
    },
  ]
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <h1 className="-m-1.5 p-1.5 text-xl font-semibold">PDF-DL</h1>
        </div>

        <div className="flex flex-1 justify-end">
          {socials.map((social) => (
            <Link
              href={social.href}
              key={social.name}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Button variant="ghost" size="icon">
                {social.icon}
              </Button>
            </Link>
          ))}
          <ModeToggle />
        </div>
      </nav>
    </header>
  )
}
