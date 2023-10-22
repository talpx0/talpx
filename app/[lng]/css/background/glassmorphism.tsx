/** @jsxImportSource @emotion/react */
'use client'
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { css } from '@emotion/react'
import { ChangeEvent, Dispatch, useEffect, useMemo, useReducer, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Toggle } from "@radix-ui/react-toggle"
import {BsX} from "react-icons/bs"
import { LabeledSlider } from "./labelSlider"
import { useTheme } from "next-themes"
import Loading from "@/app/widget/loading"
import CopyToClipboard from "@/app/widget/clipboard"

export type ColorStop = {
    color: string;
    percent: number;
  };

type BgImgStateProps = {
    bgImgDegree: string;
    colorStops: ColorStop[]
}

type GlassEffectProps = {
    bgTransparent: number;
    blur: string;
    glassBgColor: string;
}
type BgImgAction =
  | { type: "UPDATE_BG_IMG_DEGREE"; payload: string }
  | { type: "ADD_COLOR_STOP"}
  | { type: "REMOVE_COLOR_STOP"; payload: number } // payload is the index of the color stop to remove
  | { type: "UPDATE_COLOR_STOP"; payload: { index: number, colorStop: ColorStop } }
  | { type: "UPDATE_COLOR_PERCENT"; payload: { index: number, value: number } }
  | { type: "SET_THEME_STATE";  payload: BgImgStateProps };

type GlassEffectAction =
    | { type: "UPDATE_TRANSPARENT"; payload: number }
    | { type: "UPDATE_BLUR"; payload: string }
    | { type: "UPDATE_GLASS_BG_COLOR"; payload: string };

    const bgImgReducer = (
        state: BgImgStateProps,
        action: BgImgAction
      ): BgImgStateProps => {
        switch (action.type) {
            case "UPDATE_BG_IMG_DEGREE":
            return { ...state, bgImgDegree: action.payload };
            
            case "ADD_COLOR_STOP": {
            if (state.colorStops.length >= 4) {
                return state; // Return the current state if there are already 4 colors
                }
                return {
                ...state,
                colorStops: [...state.colorStops, { color: "#c4caef", percent: 100 }]
                };
            }  
            case "REMOVE_COLOR_STOP":
                return {
                    ...state,
                    colorStops: state.colorStops.filter((_, index) => index !== action.payload)
                };
            case "UPDATE_COLOR_STOP":
            const updatedStops = [...state.colorStops];
            updatedStops[action.payload.index] = action.payload.colorStop;
                return { ...state, colorStops: updatedStops };
            case "SET_THEME_STATE":
                return action.payload
            case "UPDATE_COLOR_PERCENT": {
                const newStops = state.colorStops.map(stop => ({ ...stop }));
                newStops[action.payload.index] = {
                    ...newStops[action.payload.index], 
                    percent: action.payload.value 
                }
            
                for (let i = action.payload.index ; i > 0; i--) {
                    if (newStops[i-1].percent > newStops[i].percent) {
                        newStops[i-1].percent = Math.max(0, newStops[i].percent - 5);
                    }
                }
            
                for (let i = action.payload.index + 1; i < newStops.length ; i++) {
                    if (newStops[i].percent < newStops[i - 1].percent) {
                        newStops[i].percent = Math.min(100, newStops[i - 1].percent + 5);
                    }
                }            
                return {
                    ...state,
                    colorStops: newStops
                };
            }            
          default:
            return state;
        }
    };

const glassEffectReducer = (
    state: GlassEffectProps,
    action: GlassEffectAction
): GlassEffectProps => {
    switch (action.type) {
        case "UPDATE_TRANSPARENT":
            return { ...state, bgTransparent: action.payload };
        case "UPDATE_BLUR":
            return { ...state, blur: action.payload };
        case "UPDATE_GLASS_BG_COLOR":
            return { ...state, glassBgColor: action.payload };
        default:
            return state;
    }
};

export const BackgroundTool =()=> {
    const [mounted, setMounted] = useState(false) 
    useEffect(() => {
        setMounted(true)
      }, [])
      if (!mounted) {
        return <Loading />
      }
    return (
        <BgContainer  />
    )  
}

export const BgContainer =()=> {
    const {theme, setTheme } = useTheme()
    const bgImgProps = useMemo(() => {
        return {
            bgImgDegree: "45deg",
            colorStops: [
                { color: "#2b2e4a", percent: 0 },
                { color: "#c4caef", percent: 50 }
            ]
        };
    }, []);
    const darkBgImgProps = useMemo(() => {
        return {
            bgImgDegree: "180deg",  // Gradient direction
            colorStops: [
                { color: "#463f3a", percent: 0 },  // Start color
                { color: "#2b2e4a", percent: 50 }   // Mid color
            ]
        };
    }, []);
    const glassEffectProps = {
        bgTransparent: 0.5,
        blur: "5px",
        glassBgColor: "rgb(255, 255, 255)",
    }

    const [bgImgState, imgDispatch] = useReducer(bgImgReducer, theme === "light" ? bgImgProps : darkBgImgProps)

    const [glassEffect, glassDispatch] = useReducer(glassEffectReducer, glassEffectProps)

    useEffect(()=>{
        const updateTheme = theme === "light" ? bgImgProps : darkBgImgProps
        imgDispatch(
            {
                type: 'SET_THEME_STATE',
                payload: updateTheme
            }
        )
    },[bgImgProps, darkBgImgProps, theme])
     
    const gradientStops = bgImgState.colorStops
    .map( stop => `${stop.color} ${stop.percent}%`)
    .join(', ');

    const backgroundImageCss = `background-image: linear-gradient(${bgImgState.bgImgDegree}, ${gradientStops});
    `;
    const glassEffectCss = `backdrop-filter: blur(${glassEffect.blur}); 
    background-color: ${`${glassEffect.glassBgColor.slice(0, -1)},${glassEffect.bgTransparent})`};
    `;
    return (
        <section className="h-dashboard flex" css={css`${backgroundImageCss}`} >
            <section className="h-52 w-52 flex-[0_0_60%]">
            </section>
            <section className="flex-[0_0_40%] p-12 flex justify-around">
                <section className="w-full h-full rounded-lg bg-cuteCat object-cover">
                    <section className="w-full h-full py-10 px-5 rounded-lg" css={css`${glassEffectCss}`}>
                        <BackgroundControl bgImg={bgImgState} dispatch={imgDispatch}/>
                        <CopyToClipboard content={backgroundImageCss} />
                        <GlassEffectControl glassEffect={glassEffect} dispatch={glassDispatch} />
                        <CopyToClipboard content={glassEffectCss} />
                    </section>
                </section>
            </section>
        </section>
    )
}

const BackgroundControl =({
    bgImg, 
    dispatch
}:{
    bgImg: BgImgStateProps;
    dispatch: Dispatch<any>;
}) => {
    const handleChangeColor = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const updatedStops = [...bgImg.colorStops];
        updatedStops[index].color = event.target.value;
        dispatch({
          type: "UPDATE_COLOR_STOP",
          payload: { index: index, colorStop: updatedStops[index] }
        });
    };

    const handleAddColor = () => {
        dispatch( { type: "ADD_COLOR_STOP"});
    }

    const handleRemove =(index:number)=> {
        dispatch({
          type: "REMOVE_COLOR_STOP",
          payload: index
        });
    }

    return(
        <section>
            <section className="flex items-center flex-wrap">
                {bgImg.colorStops.map((stop, index) => (
                    <section key={index} className="flex-[0_0_50%] flex items-center text-sm font-bold my-2">
                        <div>{`Color\u00A0${index + 1}:`}</div>
                        <div className="w-5 h-5 mx-1 border" css={css`background-color:${stop.color};`}></div>
                        <input 
                            type="text" 
                            value={stop.color} 
                            onChange={(event) => handleChangeColor(event, index)} 
                            className="w-20 mx-1 bg-transparent border-b-2 border-gray-600 focus:outline-none focus:border-indigo-600"
                        />
                    </section>
                ))}
            </section>
            <LabeledSlider
                label="Degree"
                defaultValue={[parseInt(bgImg.bgImgDegree, 10)]}
                max={360}
                step={1}
                onValueChange={(value) => {
                    dispatch({
                        type: "UPDATE_BG_IMG_DEGREE",
                        payload: `${value[0]}deg`
                    });
                }}
                className={cn()}
            />
            {bgImg.colorStops.map((stop, index) => (
                <section key={index} className="flex items-center w-full my-4">
                    <div className="text-sm font-bold mr-2 w-24">
                        {`Percent\u00A0${index + 1}:`}
                    </div>
                    <div className="flex w-full">
                        <Slider
                            value={[stop.percent]}
                            max={100}
                            step={1}
                            onValueChange={(value) => {
                                dispatch({
                                    type: "UPDATE_COLOR_PERCENT",
                                    payload: { 
                                        index: index, 
                                        value: value[0] 
                                    }
                                });
                            }}
                            className={cn("w-full")}
                        />
                        {bgImg.colorStops.length > 2 && <Toggle onClick={()=>handleRemove(index)}><BsX className="h-5 w-5" /></Toggle> }
                    </div>
                </section>
            ))}
            {bgImg.colorStops.length < 4 && <Button className="w-full my-3" onClick={handleAddColor}>Add more color</Button>}
        </section>
    );
}

export const GlassEffectControl = ({
    glassEffect,
    dispatch
}:{
    glassEffect: GlassEffectProps,
    dispatch: Dispatch<any>
}) => {
    return (
        <>
            <section>
                <h4>Glass Effect</h4>
                <LabeledSlider
                    label="Opaque"
                    defaultValue={[glassEffect.bgTransparent * 100]}
                    max={100}
                    step={5}
                    onValueChange={(value) => {
                        dispatch({
                            type: "UPDATE_TRANSPARENT",
                            payload: value[0] / 100
                        });
                    }}
                    className={cn()}
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
                    className={cn()}
                />
            </section>
        </>
    );
}
