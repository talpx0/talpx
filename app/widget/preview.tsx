/** @jsxImportSource @emotion/react */
'use client'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {  ChevronRight, Mail } from "lucide-react"
import {BsFillHexagonFill, BsCircleFill, BsStarFill,BsDiamondFill, BsTriangleFill} from 'react-icons/bs'
import { css } from '@emotion/react';



export const PreviewTemplate = ({ styles }:{styles?: string}) => {
    return (
            <section className="h-full w-full grid grid-rows-6 gap-4">
                <ButtonPreview styles={styles} />
                <ShapePreview styles={styles} />
                <TitlePreview styles={styles} />
                <AdPreview styles={styles} />
            </section>
    )
}



export const ButtonPreview = ({ styles }:{styles?: string}) => {
    return (
            <section className="row-span-2 flex flex-wrap p-2 border items-center overflow-hidden" css={css`${styles}`}>
                <Button className="m-2">Button</Button>
                <Button className="m-2" variant="destructive">Destructive</Button>
                <Button variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                </Button>
                <Button className="m-2" variant="outline">Outline</Button>
                <Button className="m-2">
                    <Mail className="mr-2 h-4 w-4" /> Login with Email
                </Button>
                <Button className="m-2" variant="link">Link</Button>
                <Badge className="m-2 h-5">Badge</Badge>
                <Badge className="m-2 h-5" variant="secondary">Secondary</Badge>
            </section>
    );
}

export const ShapePreview = ({ styles }:{styles?: string}) => {
    return (
        <section 
            className=" row-span-1 w-full h-full flex flex-wrap p-2 border items-center justify-around text-2xl rounded" 
            css={css`${styles}`}
        >
            <BsFillHexagonFill />
            <BsCircleFill />
            <BsStarFill />
            <BsDiamondFill />
            <BsTriangleFill />
        </section>
    );
}


export const TitlePreview = ({ styles }:{styles?: string}) => {
    return (
        <section  
            className="row-span-2 w-full h-full border px-2 flex flex-col justify-around"
            css={css`${styles}`}
        >
            <div className="text-2xl my-2">Prominent color enhances readability</div>
            <div className="my-2" >Prominent color enhances readability</div>
            <div className="text-xs my-2">Prominent color enhances readability</div>
        </section>
    );
}



export const AdPreview =({ styles }:{styles?: string})=> {
    return <div className="row-span-1 w-full h-full border">
        <div className="border w-full h-full flex items-center justify-center" css={css`${styles}`}>
            It is for ad
        </div>
    </div>
}