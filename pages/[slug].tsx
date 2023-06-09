//@ts-nocheck
import { getPage } from "@/sanity/sanity-utils"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { PortableText } from "@portabletext/react"

async function load(slug: string) {
  return await getPage(slug)
}

export default function Page() {
  const router = useRouter()
  const slug = router.query.slug

  const [page, setpage] = useState({})

  useEffect(() => {
    load(slug)
      .then(res => {
        setpage(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [slug])

  return (
    <div>
      <h1 className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent text-5xl drop-shadow font-extrabold">
        {page.title}
      </h1>
      <div className="text-lg text-gray-700 mt-10">
        <PortableText value={page.content} />
      </div>
    </div>
  )
}
