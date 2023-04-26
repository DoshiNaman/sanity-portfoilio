//@ts-nocheck
import { getProject } from "@/sanity/sanity-utils"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { PortableText } from "@portabletext/react"
import { Project } from "@/types/Project"
import Image from "next/image"
import { PortableTextBlock } from "sanity"

async function load(slug: string) {
  return await getProject(slug)
}

export default function Project() {
  const router = useRouter()
  const slug = router.query.project

  const [project, setproject] = useState({})

  useEffect(() => {
    load(slug)
      .then(res => {
        setproject(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [slug])

  return (
    <div>
      <header className="flex items-center justify-between">
        <h1 className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent text-5xl drop-shadow font-extrabold">
          {project.name}
        </h1>
        <a
          href={project.url}
          title="View Project"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-100 rounded-lg text-gray-500 font-bold py-3 px-4 whitespace-nowrap hover:bg-pink-500 hover:text-pink-100 transition"
        >
          View Project
        </a>
      </header>
      <div className="text-lg text-gray-700 mt-5">
        <PortableText value={project.content} />
      </div>
      <Image
        src={project.image}
        alt={project.name}
        width={1920}
        height={1080}
        className="mt-10 border-2 border-gray-700 object-cover rounded-xl"
        style={{ height: "500px" }}
      />
    </div>
  )
}
