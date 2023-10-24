'use client'

import LoadingState from "@/app/widget/loading"
import { useEffect, useState } from "react"


type ButtonProps = {
    background: string
    color: string
    fontSize: string
    textDecoration: string
    fontWeight: string
    borderRadius: string
    border: ButtonBorder
    boxShadow: string
    width: string
    height: string 
}

type ButtonBorder = {
    width: number
    color: string
    style: string
}

type ButtonAction = {
    hover: string
    active: string
    focus: string 
}



export const BUttonTool =()=> {
    const [mounted, setMounted] = useState(false) 
    useEffect(() => {
        setMounted(true)
      }, [])
      if (!mounted) {
        return <LoadingState />
      }
    return (
        <ButtonConatiner />
    )  
}



export const ButtonConatiner =()=>{
    return(
        <>
            
        </>
    )
}