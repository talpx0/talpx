/** @jsxImportSource @emotion/react */
'use client'
import Loading from "@/app/widget/loading";
import { useParams } from "next/navigation";
import { useReducer, useState } from "react";
import useSWR, { Fetcher } from "swr";
import { SecondaryColors, SwrTheme, Theme } from "./themeProp";
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {BiErrorCircle} from "react-icons/bi"
import Link from "next/link";
import { css } from '@emotion/react'



const secondary = [
    'complementary',
    'analogous',
    'triadic',
    'splitComplementary',
    'square',
    'monochromatic',
    'uniformDistribution',
    'goldenRatio',
] 

const BaseColor = [
    {
      value: "main",
      label: "main",
    },
    {
      value: "dark",
      label: "dark",
    },
    {
      value: "light",
      label: "light",
    }
]

export const ThemeBox =()=> {
    const params = useParams() as Record<string, string | string[]>
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [index, setIndex] = useState<number>(0);

    const fetcher = (url:string) => fetch(url).then((res) => res.json());
    
    const handleColor = (i: number) => {
        setIndex((prevIndex ) => (prevIndex + 1) % secondary.length);
    };

    const getScendaryCss =(colorData:SecondaryColors)=> {
        const currentColorScheme = secondary[index] as keyof SecondaryColors;
        const currentColors = colorData[currentColorScheme] ;
        return css`
            background-color: ${currentColors.main.hex};
            border-color: ${currentColors.main.hex};
            &:hover {
                background-color: ${currentColors.light.hex};
            }
            &:active {
                background-color: ${currentColors.dark.hex}
            }
        `
    }

    const { data, error } = useSWR<SwrTheme, string>(`/api/theme/${params.theme}`, fetcher);
    if (error) return <div>Failed to load {error}</div>;
    if (!data) return <Loading />;
    if (data.error) return <div>Error not such file {data.error.message}</div>
    return(
        <>
        <main className="flex flex-wrap">
            {data.map((item, i)=> <section key={i} className="p-2 w-1/4 my-10 aspect-square ">
                    <section className="p-2 aspect-square border rounded-md">
                        <section className="flex h-8 items-center justify-around">
                            <Link href="/" className="text-xs">Talpx</Link>
                            <Link href="/" className="text-xs"
                            css={
                                css`
                                    color: ${item.info.main.hex};
                                    &:hover{
                                        color:${item.info.light.hex};  
                                        text-decoration: underline;
                                        text-underline-offset: 3px;
                                    }
                                    &:active{
                                        color:${item.info.dark.hex}
                                    }
                                `
                            }
                            >Info</Link>
                            <Badge variant={"outline"} className="flex items-center justify-center">
                                <div className="w-1 h-1 rounded-full mr-1" css={css`background-color: ${item.success.main.hex};`}></div>
                                <div className="text-xs"css={css`color: ${item.success.dark.hex};`}>Success</div>
                            </Badge>
                        </section>
                        <section className="flex border h-8 items-center pl-3 rounded-sm ">
                            <BiErrorCircle className="mx-1" style={{color: `${item.error.main.hex}`}}/>
                            <span className="text-xs" style={{color:`${item.error.dark.hex}`}} > Error: Just a message</span>
                        </section>
                        <section className="border h-1/6 text-xs my-2 px-2 rounded flex items-center ">
                            <div>Main Color: </div>
                            <div className="flex w-4 h-4 mx-1" css={ css`background-color: ${item.primary.main.hex};`}></div>
                            <div className="flex w-4 h-4 mx-1"  css={ css`background-color: ${item.secondary.main.hex};`}></div>
                            <div className="flex w-4 h-4 mx-1" css={ css`background-color: ${item.info.main.hex};`}></div>
                            <div className="flex w-4 h-4 mx-1" css={ css`background-color: ${item.success.main.hex};`}></div>
                            <div className="flex w-4 h-4 mx-1" css={ css`background-color: ${item.error.main.hex};`}></div>
                            <div className="flex w-4 h-4 mx-1" css={ css`background-color: ${item.warning.main.hex};`}></div>
                        </section>
                        <button className="text-xs border p-2 w-full" >
                        Click to obtain additional information regarding the dark and light colors, switch the secondary color, retrieve the hex code, and more..
                        </button>
                        <section className="flex item justify-around items-center h-10" >
                            <button 
                                className="p-2 w-24 rounded text-black text-xs focus:outline-none disabled:opacity-50 transition duration-200 ease-in-out dark:text-white"
                                css={css`
                                    background-color: ${item.primary.main.hex};
                                    border-color: ${item.primary.main.hex};
                                    &:hover {
                                        background-color: ${item.primary.light.hex};
                                    }
                                    &:active {
                                        background-color: ${item.primary.dark.hex}
                                    }
                                `}
                            >
                                Primary
                            </button>
                            <button 
                                className="p-2 w-24 rounded text-black text-xs focus:outline-none disabled:opacity-50 transition duration-200 ease-in-out"
                                css={css`
                                    background-color: ${item.secondary.main.hex};
                                    border-color: ${item.secondary.main.hex};
                                    &:hover {
                                        background-color: ${item.secondary.light.hex};
                                    }
                                    &:active {
                                        background-color: ${item.secondary.dark.hex}
                                    }
                                `}
                            >
                                Secondary
                            </button>
                        </section >
                    </section>
                </section>)}
        </main>
        </>
    )
}


