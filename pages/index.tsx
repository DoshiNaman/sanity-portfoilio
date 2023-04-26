//@ts-nocheck
import { getProjects } from "@/sanity/sanity-utils"
import { Project } from "@/types/Project"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

async function load() {
  return await getProjects()
}

export default function Home() {
  const [projects, setprojects] = useState([])

  useEffect(() => {
    load()
      .then(res => {
        setprojects(res)
      })
      .catch(err => {
        console.log(err)
      })
  })

  return (
    <div>
      <h1 className="text-7xl font-extrabold">
        Hello I&apos;m{" "}
        <span className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
          {/* <span className="bg-gradient-to-r from-red-400 via-purple-500 to-orange-600 bg-clip-text text-transparent"> */}
          {/* <span className="bg-gradient-to-r from-purple-400 via-orange-500 to-red-600 bg-clip-text text-transparent"> */}
          Naman
        </span>
        !
      </h1>

      <p className="mt-3 text-xl text-gray-600">
        Aloha everyone! Check out my projects!
      </p>

      <h2 className="mt-24 font-bold text-gray-700 text-3xl">My Projects</h2>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects &&
          projects.map((project: Project) => (
            <Link
              href={`/projects/${project.slug}`}
              key={project._id}
              className="border-2 border-gray-500 rounded-lg p-1 hover:scale-105 hover:border-blue-500 transition"
            >
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.name}
                  width={750}
                  height={300}
                  className="object-cover rounded-lg border border-gray-500 bg-black "
                  style={{ height: "200px" }}
                />
              )}
              <div className="mt-2 font-extrabold bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
                {project.name}
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}
