'use client'
import {  useAppSelector } from "@/app/redux/clipboard"
export const ColorClipBoard =()=> {
    const colors = useAppSelector((state)=> state.clipboard.color)
    return (
            <>
                {colors.map((color:string, i:number)=> <div key={i} 
                style={{background: color}}
                className="h-4 w-4 m-2 inline-block">
                </div>)}
            </> 
    )
}


export const ColorDescription =()=> {
    
}