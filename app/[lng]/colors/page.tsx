
import ColorSideBox from "./single/[slug]/pc.sidebox"
import { useDictionary } from "@/i18n"
import { ParamProps } from "@/app/globalType"

export default async function Home({params}:ParamProps) {
     const {t} = await useDictionary(params.lng, "singleColor")
    return <div></div>
}