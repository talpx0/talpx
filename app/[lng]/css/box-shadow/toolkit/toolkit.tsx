/** @jsxImportSource @emotion/react */
'use client'
import { usePathname } from "next/navigation";
import { LabeledSlider } from "../../background/labelSlider";
import { ChangeEvent, Dispatch, ReactElement, useEffect, useMemo, useReducer, useState,useLayoutEffect } from "react";
import { isLightColor, validateColor } from "@/app/[lng]/util/color";
import { css } from "@emotion/react";
import { Concave, Convex, Flat, Pressed } from "@/components/svg/shadow";
import { useTheme } from "next-themes";

type ShapeProp = "Flat"|"Concave"|"Convex"|"Pressed"
type PositionProp = 'top' | 'right' | 'bottom' | 'left';
type SvgComponentProp = {
    id: number
    name: ShapeProp
    component: ReactElement
}



const svgComponents:SvgComponentProp[] = [
    { id: 0, name: "Flat", component: <Flat /> },
    { id: 1, name: "Concave", component: <Concave /> },
    { id: 2, name: "Convex", component: <Convex /> },
    { id: 3, name: "Pressed", component: <Pressed /> }
  ];

interface ShadowState {
    blur: number;
    color: string;
    size: number;
    radius: string;
    shape: ShapeProp;
    distance: number;
    colorDifference: number;
    codeString: string;
    position: PositionProp;
  }

const getSizes = () => {
if (window.innerWidth < 680 && window.navigator.userAgent !== 'ReactSnap') return { maxSize: 180, size: 150 };
if (window.innerWidth < 800 && window.navigator.userAgent !== 'ReactSnap') return { maxSize: 250, size: 200 };
if ((window.innerWidth < 1000 || window.innerHeight < 860) && window.navigator.userAgent !== 'ReactSnap') return { maxSize: 350, size: 250 };
return { maxSize: 410, size: 300 };
}

export function colorLuminance(hex: string, lum: number = 0): string {
    // Ensure hex is a string and has a valid format
    if (typeof hex !== 'string' || !/^#?[0-9a-f]{3,6}$/i.test(hex)) {
        return '#FFFFFF';  // Return white as default
    }
    
    // Ensure hex has a consistent 6-digit format
    hex = hex.charAt(0) === '#' ? hex.slice(1) : hex;
    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }

    // Extract and adjust RGB components
    const adjustColor = (color: number): string => {
        let adjusted = Math.round(color * (1 + lum));
        adjusted = Math.max(0, Math.min(255, adjusted));  // Clamp between 0 and 255
        return adjusted.toString(16).padStart(2, '0');    // Convert to hex and ensure 2 characters
    };

    const red = adjustColor(parseInt(hex.slice(0, 2), 16));
    const green = adjustColor(parseInt(hex.slice(2, 4), 16));
    const blue = adjustColor(parseInt(hex.slice(4, 6), 16));

    return `#${red}${green}${blue}`;
}


const determineRadius = (currentRadius:string, newSize:number, oldSize:number) => {
    if (currentRadius.includes('%')) return "50%";

    const numericRadius = parseInt(currentRadius, 10);
    if (newSize < (2 * numericRadius)) return "50%";

    const rate = newSize / oldSize;
    return `${Math.round(numericRadius * rate)}px`;
};

type Action =
  | { type: 'SET_COLOR'; payload: string }
  | { type: 'SET_DISTANCE'; payload: number }
  | { type: 'SET_SIZE'; payload: number }
  | { type: 'SET_SHAPE'; payload: ShapeProp }
  | { type: 'SET_RADIUS'; payload: number}
  | { type: 'SET_POSITION'; payload: PositionProp}
  | { type: 'SET_INTENSITY'; payload: number}
  | { type: 'SET_RADIUS'; payload: string}
  | { type: 'SET_BLUR'; payload: number}
  | { type: 'SET_BG_COLOR'; payload: string}
  | { type: 'SET_THEME_STATE'; payload: ShadowState}

const reducer = (state:ShadowState, action:Action) => {
    switch (action.type) {
        case 'SET_COLOR':
            window.history.replaceState('homepage', 'Title', '/' + action.payload);
            return { ...state, color: action.payload };
        case 'SET_RADIUS':
            if (state.radius.includes('%')) {
                return {
                    ...state,
                    radius: `${action.payload}px`
                };
            } else if (state.size < (2 * parseInt(state.radius))) {
                return {
                    ...state,
                    radius: "50%"
                };
            } else {
                return {
                    ...state,
                    radius: `${action.payload}px`
                };
            }
        case 'SET_DISTANCE':
            return { ...state, distance: action.payload, blur: action.payload * 2 };
    
        case 'SET_SIZE': {
            const newSize = action.payload;
            const newRadius = determineRadius(state.radius, newSize, state.size);
            return { 
                ...state,
                size: newSize,
                distance: Math.round(newSize * 0.1),
                blur: Math.round(newSize * 0.2),
                radius: newRadius
            };
        }
        case 'SET_INTENSITY': 
            return { ...state, colorDifference: action.payload};
        case 'SET_SHAPE':
            return { ...state, shape: action.payload};
        case 'SET_POSITION':
            return {...state, position:action.payload }
        case 'SET_BLUR':
            return {...state, blur: action.payload }
        case 'SET_BG_COLOR':
            return {...state, color: action.payload} 
        case 'SET_THEME_STATE':
            return action.payload
        default:
            return state;
    }
  };
  
const getDirectionData = (distance: number, position: 'top' | 'right' | 'bottom' | 'left') => {
    switch (position) {
        case "top":
        return {
            first: [`${distance}px`, `${distance}px`],
            second: [`-${distance}px`, `-${distance}px`],
            degree: "145deg"
        };
        case "right":
        return {
            first: [`-${distance}px`, `${distance}px`],
            second: [`${distance}px`, `-${distance}px`],
            degree: "225deg"
        };
        case "bottom":
        return {
            first: [`-${distance}px`, `-${distance}px`],
            second: [`${distance}px`, `${distance}px`],
            degree: "315deg"
        };
        case "left":
        return {
            first: [`${distance}px`, `-${distance}px`],
            second: [`-${distance}px`, `${distance}px`],
            degree: "45deg"
        };
        default:
        return {
            first: [`${distance}px`, `${distance}px`],
            second: [`-${distance}px`, `-${distance}px`],
            degree: "145deg"
        };
    }
}
type BgImageResult = {
    shadowImg: string;
    insert: string;
};
const getBgImage =(color:string, shape:ShapeProp, degree:string):BgImageResult => {
    switch(shape) {
        case("Flat"): 
            return {
                shadowImg:color,
                insert: "",
            }
        case("Concave"):
            return {
                shadowImg: `linear-gradient(${degree}, ${colorLuminance(color, -0.1)}, ${colorLuminance(color, 0.07)})`,
                insert: ""
            } 
        case("Convex"):
            return { 
                shadowImg:`linear-gradient(${degree}, ${colorLuminance(color, 0.07)}, ${colorLuminance(color, -0.1)})`,
                insert: ""
            } 
        case("Pressed"):
            return {
                shadowImg: color,
                insert: "inset"
            }
        default:
            return {
                shadowImg: color,
                insert: ""
            }
    }
}


export const BoxShadowTool =()=> {
    const pathname = usePathname()!;
    const lastIndex = pathname.lastIndexOf('#');
    const {theme, setTheme } = useTheme()

    let defaultColor: string|undefined = pathname.slice(lastIndex);
    if (!/^#[0-9A-F]{6}$/i.test(defaultColor)) {
        defaultColor = undefined; 
    }
    const lightState: ShadowState = {
        blur: 60,
        color: defaultColor || '#e0e0e0',
        size: 300,
        radius: "50px",
        shape: "Flat",
        distance: 20,
        colorDifference: 0.15,
        codeString: '',
        position: 'top' ,      
    };

    const darkState: ShadowState = {
        blur: 60,
        color: defaultColor || '#373a5c',
        size: 300,
        radius: "50px",
        shape: "Flat",
        distance: 20,
        colorDifference: 0.15,
        codeString: '',
        position: 'top' ,      
    };
    const [shadow, dispatch] = useReducer(reducer, theme === "light" ? lightState : darkState)
    useEffect(()=>{
        const initialTheme = theme === "light" ? lightState : darkState
        dispatch(
            {
                type: "SET_THEME_STATE",
                payload: initialTheme
            }
        )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[theme])

    useEffect(()=>{
        isLightColor(shadow.color) ? setTheme("light"): setTheme("dark")
    },[shadow.color, setTheme])

    const { darkColor, lightColor } = useMemo(() => {
        return {
            darkColor: colorLuminance(shadow.color, shadow.colorDifference * -1),
            lightColor: colorLuminance(shadow.color, shadow.colorDifference)
        };
    }, [shadow.color, shadow.colorDifference]);

    const { first, second, degree } = useMemo(() => {
        return getDirectionData(shadow.distance, shadow.position);
    }, [shadow.distance, shadow.position]);

    const { shadowImg, insert } = useMemo(() => {
        return getBgImage(shadow.color, shadow.shape, degree);
    }, [shadow.color, shadow.shape, degree]);      
    
    const boxStyles = `background:     ${shadowImg};
        box-shadow: ${insert} ${first[0]} ${first[1]} ${shadow.blur}px ${darkColor},
                    ${insert} ${second[0]} ${second[1]} ${shadow.blur}px ${lightColor};
        `;

    const boxRoundStyles = `border-radius: ${shadow.radius};`;
    const combinedStyles = `${boxStyles} ${boxRoundStyles}`;
    const handleCopy = () => {
        navigator.clipboard.writeText(combinedStyles)
            .then(() => {
                console.log('Text copied to clipboard');
            })
            .catch(err => {
                console.error('Could not copy text: ', err);
            });
    }
    return(
        <>
        <section css={css` background: ${shadow.color};`} className="h-dashboard flex flex-col">
            <section className="h-14 w-full"></section>
            <section className="flex flex-row h-full w-full p-5">
                <section className="w-1/2 flex items-center justify-center p-10 ">
                    <section css={css`${boxStyles} 
                        width: ${shadow.size}px ; 
                        height: ${shadow.size}px; 
                        border-radius: ${shadow.radius}; `} >
                    </section>
                </section> 
                <section className="w-1/2 p-12 flex justify-around">
                    <section className="h-full w-full rounded-lg p-10" css={css`${boxStyles}`}>
                        <BoxShadowBox shadowState={shadow} dispatch={dispatch} />
                        <div className="my-4 whitespace-pre-line font-mono border py-5 px-2
                        bg-black text-white text-xs rounded-sm relative dark:text-white dark:border-none ">
                            <button className="absolute right-0 text-white top-0 px-3 py-[2px] bg-indigo-600"
                                onClick={handleCopy}
                                >
                                Copy
                            </button>
                            {combinedStyles}
                        </div>
                    </section>
                </section> 
            </section>
        </section>
        </>
    )
}



export const BoxShadowExample =({
    shadowState,
    dispatch 
 }:{
    shadowState:ShadowState,
    dispatch: Dispatch<Action>;
 })=> {
    return <section css={css`background-color:${shadowState.color};`}>
        
    </section>
}


const BoxShadowBox =({
   shadowState,
   dispatch 
}:{
   shadowState:ShadowState,
   dispatch: Dispatch<Action>;
}
)=> {
    const [input, setInput] = useState(shadowState.color)
    const [selectedId, setSelectedId] = useState<number>(0);
    const handleChangeColor = (event: ChangeEvent<HTMLInputElement>) => {
        const color = event.target.value
        setInput(color);
        if (validateColor(color)){
            dispatch({
                type: "SET_BG_COLOR",
                payload: event.target.value
            });
        }
    }
    return(
        <section className="">
            <section className="flex-[0_0_50%] flex items-center text-sm font-bold my-2">
                        <div>Background Color:</div>
                        <div className="w-5 h-5 mx-1 border border-slate-950 dark:border-slate-50" css={css`background-color:${shadowState.color};`}></div>
                        <input 
                            type="text" 
                            value={input} 
                            onChange={(event) => handleChangeColor(event)} 
                            className="w-20 mx-1 bg-transparent border-b-2 border-gray-600 focus:outline-none focus:border-indigo-600"
                        />
                </section>
            <LabeledSlider
                label="Size"
                defaultValue={[shadowState.size]}
                max={360}
                min={5}
                step={1}
                onValueChange={(value) => {
                    dispatch({
                        type: "SET_SIZE",
                        payload: value[0]
                    });
                }}
            />
            <LabeledSlider
                label="Radius"
                defaultValue={[parseInt(shadowState.radius, 10)]}
                max={180}
                step={1}
                onValueChange={(value) => {
                    dispatch({
                        type: "SET_RADIUS",
                        payload: value[0]
                    });
                }}
            />
            <LabeledSlider
                label="Distance"
                value={[shadowState.distance]}
                max={50}
                min={5}
                step={1}
                onValueChange={(value) => {
                    dispatch({
                        type: "SET_DISTANCE",
                        payload: value[0]
                    });
                }}
            />
            <LabeledSlider
                label="Intensity"
                value={[shadowState.colorDifference]}
                max={0.6}
                min={0.01}
                step={0.01}
                onValueChange={(value) => {
                    dispatch({
                        type: "SET_INTENSITY",
                        payload: value[0]
                    });
                }}
            />
            <LabeledSlider
                label="Blur"

                value={[shadowState.blur]}
                max={100}
                min={0}
                step={1}
                onValueChange={(value) => {
                    dispatch({
                        type: "SET_BLUR",
                        payload: value[0]
                    });
                }}
            />
           <section className="w-full flex rounded-sm overflow-hidden ">
            {svgComponents.map((item) => (
                    <section className="relative w-1/4 " key={item.id}> 
                    <button
                        className={`transition duration-300 h-11 w-full flex ease-in-out items-center justify-center ${
                            selectedId === item.id 
                                ? 'bg-indigo-600 text-white border-indigo-600' 
                                : 'bg-gray-400 text-black hover:bg-gray-300'
                        }`}
                        onClick={() => {
                            dispatch({
                                type: 'SET_SHAPE',
                                payload: item.name
                            });
                            setSelectedId(item.id);
                        }}
                    >
                        <div css={css`& svg {
                            width: 64px;
                            height: 10.8px;}`}>
                            {item.component}
                        </div>
                    </button>
                    </section>
                ))}
           </section>
        </section>
    )
}
  

function uselayoutEffect(arg0: () => void) {
    throw new Error("Function not implemented.");
}
  