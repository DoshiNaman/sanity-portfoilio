//@ts-nocheck
import { getPages } from "@/sanity/sanity-utils"
import { Page } from "@/types/Page"
import Link from "next/link"
import { useEffect, useState } from "react"

async function load2() {
  return await getPages()
}

export default function Navbar() {
  const [pages, setpages] = useState([])

  useEffect(() => {
    load2()
      .then(res => {
        console.log(res)
        setpages(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <header className="flex items-center justify-between">
      <Link
        href="/"
        className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent text-lg font-bold"
      >
        Naman
      </Link>
      <div className="flex items-center gap-5 text-sm text-gray-600">
        {pages &&
          pages.map((page: Page) => (
            <Link
              key={page._id}
              href={`/${page.slug}`}
              className="hover:underline"
            >
              {page.title}
            </Link>
          ))}
      </div>
    </header>
  )
}
