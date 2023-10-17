'use client'
import {  useAppSelector } from "@/app/redux/clipboard"
import { Button } from "@/components/ui/button";
export const ColorClipBoard =()=> {
    const colors = useAppSelector((state)=> state.clipboard.color)
    console.log(colors);
    
    return (
            <>
                {colors.map((color, i)=> <div key={i} 
                style={{background: color}}
                className="h-4 w-4 m-2 inline-block">
                </div>)}
            </> 
    )
}


export const ColorDescription =()=> {
    
}