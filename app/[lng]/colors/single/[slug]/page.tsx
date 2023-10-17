import { SingleColorBox } from "./pc.colorbox"
import ColorSideBox from "./pc.sidebox"
import { ColorClipBoard } from "./csr.component"
import { ParamProps } from "@/app/globalType"



const Page = async ({params}: ParamProps) => {
    return(
       <section className="h-dashboard flex" >
            <section className="flex-[0_0_220px] h-dashboard overflow-y-scroll no-scrollbar">
                <ColorSideBox lng={params.lng}>
                    <ColorClipBoard />
                </ColorSideBox >
            </section>
            <section className="flex-[0_0_calc(100%-220px)] h-dashboard overflow-y-auto">
                    <SingleColorBox />
            </section>
        </section>
    )
}

export default Page