import React from "react";
import { 
    TbInnerShadowTopLeftFilled, 
    TbInnerShadowTopLeft,
    TbInnerShadowTopRightFilled,
    TbInnerShadowTopRight,
    TbInnerShadowBottomLeftFilled,
    TbInnerShadowBottomLeft,
    TbInnerShadowBottomRightFilled,
    TbInnerShadowBottomRight
} from "react-icons/tb";

interface ShadowIconSet {
    filled: JSX.Element;
    outlined: JSX.Element;
    id: number;
    position: "top" | "right" | "bottom" | "left";
}

const shadowIcons: ShadowIconSet[] = [
    { filled: <TbInnerShadowTopLeftFilled />, outlined: <TbInnerShadowTopLeft />, id: 0, position: "top" },
    { filled: <TbInnerShadowTopRightFilled />, outlined: <TbInnerShadowTopRight />, id: 1, position: "right" },
    { filled: <TbInnerShadowBottomLeftFilled />, outlined: <TbInnerShadowBottomLeft />, id: 2, position: "bottom" },
    { filled: <TbInnerShadowBottomRightFilled />, outlined: <TbInnerShadowBottomRight />, id: 3, position: "left" }
];

export default shadowIcons;
