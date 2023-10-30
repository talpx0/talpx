/** @jsxImportSource @emotion/react */
'use client'
import {  Dispatch, useEffect, useMemo, useReducer, useState} from "react"
import { LabeledSlider } from "../background/labelSlider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import { css } from "@emotion/react";
import CopyToClipboard from "@/app/widget/clipboard";
import { PreviewTemplate } from "@/app/widget/preview";


type GlassEffectProps = {
    bgTransparent: number;
    blur: string;
    glassBgColor: string;
    backgroundImage: string;
}

type GlassEffectAction =
    | { type: "SET_TRANSPARENT"; payload: number }
    | { type: "UPDATE_BLUR"; payload: string }
    | { type: "UPDATE_GLASS_BG_COLOR"; payload: string }
    | { type: "SET_BACKGROUND_IMAGE"; payload: string }
    | { type: "SET_THEME_STATE"; payload:GlassEffectProps }


    const glassEffectReducer = (
        state: GlassEffectProps,
        action: GlassEffectAction
    ): GlassEffectProps => {
        switch (action.type) {
            case "SET_TRANSPARENT":
                return { ...state, bgTransparent: action.payload };
            case "UPDATE_BLUR":
                return { ...state, blur: action.payload };
            case "UPDATE_GLASS_BG_COLOR":
                return { ...state, glassBgColor: action.payload };
            case "SET_BACKGROUND_IMAGE":
                return {...state,  backgroundImage:action.payload }
            case "SET_THEME_STATE":
                return action.payload
            default:
                return state;
        }
    };


export const GlassEffectContainer =()=>{
    const {theme} = useTheme()

    const darkGlassProps:GlassEffectProps = useMemo(()=>{
        return {
            bgTransparent: 0.3,
            blur: "15px",
            glassBgColor: "rgb(29, 28, 28)",
            backgroundImage: "url('/assets/background.jpg')"
        }
    },[]) 

    const whiteGlassProps:GlassEffectProps = useMemo(()=>{
        return {
            bgTransparent: 0.3,
            blur: "15px",
            glassBgColor: "rgb(255, 255, 255)",
            backgroundImage: "url('/assets/whitebg.jpg')"
        }
    },[])

    const [glassEffectState, glassDispatch] = useReducer(glassEffectReducer, theme === "light" ? whiteGlassProps: darkGlassProps)
    useEffect(()=>{
        const updateGlassEffect = theme === "light" ? whiteGlassProps : darkGlassProps
        glassDispatch(
            {
                type: 'SET_THEME_STATE',
                payload: updateGlassEffect
            }
        )
    },[darkGlassProps, theme, whiteGlassProps])

    const glassEffectCss = `backdrop-filter: blur(${glassEffectState.blur}); 
    background-color: ${`${glassEffectState.glassBgColor.slice(0, -1)},${glassEffectState.bgTransparent})`};
    `;
    return <>
        <section className="h-dashboard flex flex-col" css={css`background: ${glassEffectState.backgroundImage};`} >
            <div className="h-14"></div>
            <div className="flex h-full px-4">
                <section className="flex-[0-0-50%] h-full p-10 pl-20">
                    <PreviewTemplate styles={glassEffectCss} />
                </section>
                <section className="flex-[0_0_50%] p-10 flex justify-around">
                    <section className="h-full w-full rounded-lg p-8 max-w-lg border " css={css`${glassEffectCss}`}>
                        <GlassEffectControl glassEffect={glassEffectState} dispatch={glassDispatch} />
                        <CopyToClipboard content={glassEffectCss} />
                    </section>
                </section>
            </div>
        </section>
    </>
}

export const GlassEffectControl = ({
    glassEffect,
    dispatch
}:{
    glassEffect: GlassEffectProps,
    dispatch: Dispatch<GlassEffectAction>
}) => {
    const [dropdown, setDropdown] = useState(false)
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            dispatch(
                {
                    type: 'SET_BACKGROUND_IMAGE',
                    payload: `url(${imageUrl})`
                }
            )
        }
    };    
    return (
        <>
            <section>
                <h4>Glass Effect</h4>
                <div>Background Color:</div>
                        <div>
                            <div className="w-5 h-5 mx-1 border border-slate-950 dark:border-slate-50" 
                                css={css`background-color:${ glassEffect.glassBgColor};`}
                                onClick={()=> setDropdown(true) }
                                >
                            </div>

                        </div>
                        
                <LabeledSlider
                    label="Opaque"
                    defaultValue={[glassEffect.bgTransparent * 100]}
                    max={100}
                    step={5}
                    onValueChange={(value) => {
                        dispatch({
                            type: "SET_TRANSPARENT",
                            payload: value[0] / 100
                        });
                    }}
                />
                <LabeledSlider
                    label="Blur"
                    defaultValue={[parseInt(glassEffect.blur, 10)]}
                    max={50}
                    step={1}
                    onValueChange={(value) => {
                        dispatch({
                            type: "UPDATE_BLUR",
                            payload: `${value[0]}px`
                        });
                    }}
                />
            </section>
            <div className="w-full items-center flex ">
                <Label htmlFor="picture" className="text-sm font-bold mr-2 w-24">Picture</Label>
                <Input id="picture" type="file" accept="image/*" onChange={handleImageUpload}/>
            </div>
        </>
    );
}
