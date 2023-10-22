/** @jsxImportSource @emotion/react */
'use client'
import { useRef, useState } from "react";
import {IoLanguage} from 'react-icons/io5'
import Link from "next/link";
import { MainMenu } from "./pc.navbar.prop";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { useCookies } from 'react-cookie';
import { useTheme } from 'next-themes'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Moon, Sun } from "lucide-react"
import { useNavbar } from "../context/navbar";
import {IoIosExpand} from 'react-icons/io'
import { TbLayoutNavbarExpandFilled } from "react-icons/tb";
import { css } from "@emotion/react";
const languages = [
    {
        id: 1,
        language: 'EN-English',
        path: '/en'
    },
    {
        id: 2,
        language: 'CN-中文',
        path: '/cn'
    },
    {
        id: 3,
        language: 'ES-Español',
        path:'/es',
    },
    {
        id: 4,
        language: 'DE-Deutsch',
        path:'/de'
    },
    {
        id: 5,
        language: 'FR-Français',
        path:'/fr'
    }
];



export const Navgation =()=> {
    const {navbarState, dispatch} = useNavbar() 
    return(
        <>
            {navbarState.navbarState === "navbar" ? <Navbar /> : <Toolbar /> }
            <Button className={`top-4 right-4 h-14 aspect-square rounded-full fixed text-2xl z-10 ${navbarState.navbarState === 'navbar' ? 'invisible' : ''} `}
                    onClick={
                        ()=>dispatch({
                            type: 'SET_NAVBAR_STATE',
                            payload: "navbar"
                        })}>
                <TbLayoutNavbarExpandFilled /> 
            </Button>
        </>
    ) 
}


export const Navbar =()=> {
    return (
        <section  className={`
                    h-16 flex w-full items-center border-b sticky top-0 bg-white
                    dark:bg-black
                    `}
            >
                <nav className=" flex-[0_0_60%] flex justify-around items-center"><LeftNavbar /></nav>
                <nav className="flex-none w-4/10"><RightNavbar /></nav>
            </section>
    )
}



export const Toolbar =()=> {
    const {navbarState, dispatch} = useNavbar() 
    return(
        <section className="h-16 flex w-full items-center sticky top-0 border-b"
                css={css`${navbarState.color}`}     
        ></section>
    )
}

function replacePathSegment(url: string, newLang: string): string {
    // Matches the segment immediately after the root slash
    return url.replace(/^\/[^\/]+/, `${newLang}`);
}

export const RightNavbar =()=> {
    const { setTheme } = useTheme()
    const inputRef = useRef<HTMLInputElement>(null!)
    const pathName = usePathname() as string
    const [open , setOpen] = useState(false)
    const [showList, setShowList] = useState<string|null>(null);
    const [_, setCookie] = useCookies(['i18next']);
    const router =useRouter() 
    const toggleDrawer =()=> {
        setOpen(true)
        inputRef.current?.focus()
    }
    const handleClick =(lng:string)=> {
        const newPath = replacePathSegment(pathName,lng)
        setCookie('i18next', lng, { path: '/' });
        router.push(newPath)
    } 
    const {dispatch} = useNavbar()
    return(
        <>
            <section className="flex items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                        Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                        Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                        System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" aria-label="language" className="text-primary">
                            <IoLanguage className="h-[1.2rem] w-[1.2rem]"/>
                            <span className="sr-only">Toggle Language</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" >
                        {languages.map((lng) => (
                            <DropdownMenuItem key={lng.id} onClick={() => handleClick(lng.path)}>
                                {lng.language}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="ghost" 
                    className="aspect-square text-xl p-0" 
                    onClick={ ()=>dispatch({
                        type: 'SET_NAVBAR_STATE',
                        payload: "toolbar"
                    })}>
                    <IoIosExpand />
                </Button>
            </section>
        </>
    );
}


export const LeftNavbar = () => {
    return (
        <>
            <Link href="/" className="block pb-1 text-sm font-bold no-underline">
                T A L P X 
            </Link>
            {MainMenu.map((item) => 
                <Link href={item.link} key={item.id} className="relative block pb-1 text-sm font-bold no-underline hoverLink group ">
                    {item.name}
                    <div className="absolute bg-linkbar bottom-0 left-0 h-0.5 w-0 transition-width duration-300 ease-in-out group-hover:w-full"></div>
            </Link>
            )}
        </>
    )
}


