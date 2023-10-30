/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import  { ChangeEvent, useState } from "react";

interface ColorPickerProps {
    initialColor: string;
    component: JSX.Element
  }


export const ColorPicker = ({ initialColor, component}:ColorPickerProps) => {
    const [dropdown, setDropdown] = useState(false);

    const colorPickerCss = `
        .react-colorful__hue {
            height: 15px;
            border-radius: 0 0 0px 0px;
        }
    `;

    return (
        <div className="relative">
            <div 
                className="w-5 h-5 mx-1 border "
                css={css`background-color:${initialColor};`}
                onClick={() => setDropdown(true)}
            ></div>
            {dropdown && (
                <div 
                    className="absolute z-20 px-4 bg-none"
                    onMouseLeave={() => setDropdown(false)}
                >
                    <div className="bg-white dark:bg-black border rounded-xl" css={css`${colorPickerCss}`}>
                        {component}
                        <div className="p-3 text-xs">Current Color: ${initialColor}</div>
                    </div>
                </div>
            )}
        </div>
    );
};
