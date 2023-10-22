/** @jsxImportSource @emotion/react */
'use client'
import { usePathname } from "next/navigation";
import { LabeledSlider } from "../../background/labelSlider";
import { ChangeEvent, Dispatch, ReactElement, useEffect, useMemo, useReducer, useState} from "react";
import { colorLuminance, getColorType, isLightColor, validateColor } from "@/app/[lng]/util/color";
import { css } from "@emotion/react";
import { Concave, Convex, Flat, Pressed } from "@/components/svg/shadow";
import { useTheme } from "next-themes";
import Loading from "@/app/widget/loading";
import shadowIcons from "./offsetIcon";
import { useNavbar } from "@/app/context/navbar";


type ShapeProp = "Flat"|"Concave"|"Convex"|"Pressed"
type PositionProp = 'top' | 'right' | 'bottom' | 'left';
type SvgComponentProp = {
    id: number
    name: ShapeProp
    component: ReactElement
}


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

const svgComponents:SvgComponentProp[] = [
    { id: 0, name: "Flat", component: <Flat /> },
    { id: 1, name: "Concave", component: <Concave /> },
    { id: 2, name: "Convex", component: <Convex /> },
    { id: 3, name: "Pressed", component: <Pressed /> }
];

const getSizes = () => {
if (window.innerWidth < 680 && window.navigator.userAgent !== 'ReactSnap') return { maxSize: 180, size: 150 };
if (window.innerWidth < 800 && window.navigator.userAgent !== 'ReactSnap') return { maxSize: 250, size: 200 };
if ((window.innerWidth < 1000 || window.innerHeight < 860) && window.navigator.userAgent !== 'ReactSnap') return { maxSize: 350, size: 250 };
return { maxSize: 410, size: 300 };
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
            first: [`${distance}px`, `-${distance}px`],
            second: [`-${distance}px`, `${distance}px`],
            degree: "315deg"
        };
        case "left":
        return {
            first: [`-${distance}px`, `-${distance}px`],
            second: [`${distance}px`, `${distance}px`],
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
    const [mounted, setMounted] = useState(false) 
    useEffect(() => {
        setMounted(true)
      }, [])
      if (!mounted) {
        return <Loading />
      }
    return (
        <BoxShadowContainer  />
    )  
}


export const BoxShadowContainer =()=> {
    const {theme, setTheme } = useTheme()
    const pathname = usePathname()!;
    const lastIndex = pathname.lastIndexOf('#');
    let defaultColor: string|undefined = pathname.slice(lastIndex);
    const {dispatch:navbarDispatch} = useNavbar()
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
        blur: 14,
        color: "#373a5c",
        size: 300,
        radius: "17px",
        shape: "Flat",
        distance: 7,
        colorDifference: 0.19,
        codeString: "",
        position: "top"    
    };
    
    const [shadow, dispatch] = useReducer(reducer, theme === "light" ? lightState : darkState)

    useEffect(()=>{
        if (getColorType(shadow.color) !== theme ){
            const updatedTheme = theme === "light" ? lightState : darkState
            dispatch({
                type: 'SET_THEME_STATE',
                payload: updatedTheme
            })
        }
        return
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[theme])

    useEffect(()=>{
        isLightColor(shadow.color) ? setTheme("light"): setTheme("dark")
    },[shadow.color, setTheme])

    useEffect(()=>{
        navbarDispatch(
            {
                type: 'SET_COLOR',
                payload:  `background-color: ${shadow.color};
                    .dark & {
                background-color: ${shadow.color};`
            }
        )
    },[shadow.color,navbarDispatch])

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
    }
    return(
        <>
        <section css={css`background: ${shadow.color};`} className="flex flex-col h-dashboard">
            <section className="h-14 w-full"></section>
            <section className="flex flex-row h-full w-full p-5">
                <section className="w-1/2 flex items-center justify-center p-20 ">
                    <BoxShadowPreview shadow={shadow} dispatch={dispatch} boxStyles={boxStyles} />
                </section> 
                <section className="w-1/2 p-12 flex justify-around">
                    <section className="h-full w-full rounded-lg p-10 max-w-lg mr-auto" css={css`${boxStyles}`}>
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


export const BoxShadowPreview =({
    shadow,
    dispatch,
    boxStyles,
 }:{
    shadow:ShadowState,
    dispatch: Dispatch<Action>,
    boxStyles: string,
 })=> {
    const {theme, setTheme } = useTheme()
    const [clickedIconId, setClickedIconId] = useState<number | null>(0);
    const handleIconClick = (id: number, position: PositionProp) => {
        setClickedIconId(id);
        dispatch(
            {
                type:'SET_POSITION',
                payload: position
            }
        )
    };
    return <section className="relative w-full h-full flex items-center justify-center">
            {shadowIcons.map(icon => (
                <div 
                    key={icon.id} 
                    className={`absolute text-3xl
                    ${icon.id === 0 ? 'top-0 left-0' : ''} 
                    ${icon.id === 1 ? 'top-0 right-0' : ''} 
                    ${icon.id === 2 ? 'bottom-0 left-0' : ''} 
                    ${icon.id === 3 ? 'bottom-0 right-0' : ''} 
                    ${theme === "light" ? 'text-black': 'text-white'}
                    `} 
                    onClick={() => handleIconClick(icon.id, icon.position)}
                >
                    {clickedIconId === icon.id ? icon.filled : icon.outlined}
                </div>
            ))}
            <section css={css`${boxStyles} 
                            width: ${shadow.size}px ; 
                            height: ${shadow.size}px; 
                            border-radius: ${shadow.radius};`} >
            </section>
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
    const {dispatch:navbarDispatch} = useNavbar()
    const [input, setInput] = useState(shadowState.color)
    const [selectedId, setSelectedId] = useState<number>(0);
    useEffect(()=>{setInput(shadowState.color)},[shadowState.color])
    const handleChangeColor = (event: ChangeEvent<HTMLInputElement>) => {
        const color = event.target.value
        setInput(color);
        if (validateColor(color)){
            dispatch({
                type: "SET_BG_COLOR",
                payload: event.target.value
            });
            navbarDispatch(
                {
                    type: 'SET_COLOR',
                    payload:  `background-color: ${event.target.value};
                        .dark & {
                    background-color: ${event.target.value};`
                }
            )
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
           <section className="w-full flex rounded-sm  h-11 overflow-visible">
            {svgComponents.map((item) => (
                    <section className="w-1/4 group" key={item.id}> 
                    <button
                        className={`transition duration-300 h-11 w-full flex ease-in-out items-center justify-center  ${
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
                    <div className=" text-center opacity-0 text-sm group-hover:opacity-100 transition-opacity relative z-10 bg-slate-800 text-white">
                        {item.name} 
                    </div>
                    </section>
             ))}
           </section>
        </section>
    )
}
  

  