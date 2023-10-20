'use client'
import dynamic from "next/dynamic"
import { BoxShadowTool } from "./toolkit"

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