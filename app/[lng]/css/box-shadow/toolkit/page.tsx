'use client'
import dynamic from "next/dynamic"
import { BoxShadowTool } from "./toolkit"
import { Suspense } from "react"
import Loading from "@/app/widget/loading"

const DynamicComponent = dynamic(() =>
  import('../toolkit/toolkit').then((mod) => mod.BoxShadowTool)
)

const Page =()=> {
    return (
        <section>
                <DynamicComponent />
        </section>
    )
}

export default Page