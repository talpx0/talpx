import { GlassEffectContainer } from "./toolkit"
import { LoadingBox } from "@/app/widget/loading"


const Page =()=> {
    return (
       <LoadingBox element={<GlassEffectContainer />} />
    )
}

export default Page