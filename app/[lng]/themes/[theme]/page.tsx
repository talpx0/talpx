import { ThemeBox } from "./themeBox"
import ThemeSideBox from './pc.sidebox'
import { ColorClipBoard } from "../../colors/single/[slug]/csr.component"
import { ParamProps } from "@/app/globalType"

const Page =({params}: ParamProps)=> {
    
    return (
        <>
            <section className="h-dashboard flex">
                <section className="flex-[0_0_220px] h-dashboard overflow-y-scroll no-scrollbar">
                    <ThemeSideBox lng={params.lng}>
                        <ColorClipBoard />
                    </ThemeSideBox>
                </section>
                <section className="flex-[0_0_calc(100%-220px)] h-dashboard overflow-y-auto">
                    <ThemeBox />
                </section>
        </section>
        </>
    )
}

export default Page