'use client'
import { useDictionary } from '@/i18n';
import React, { useState, useEffect } from 'react';


export const Mainbox =()=> {
    return(
        <>
            <section className="flex">

            </section>
        </>
    )
}


export const ScrollingComponent = () => {
    const [BgImg, setBgImg] = useState({ top: "#F3EAF3", bottom: "#DCE7F9" }); // Initial background color

    useEffect(() => {
        const colorPairs = [
            { top: "#F3EAF3", bottom: "#DCE7F9" },
            { top: "#DCE7F9", bottom: "#eedce5" },
            { top: "#eedce5", bottom: "#f2e5d8" },
            { top: "#f2e5d8", bottom: "#ebeadc" },
        ];    
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const segment = Math.min(Math.floor(scrollY / windowHeight), colorPairs.length - 1);
            setBgImg(colorPairs[segment]);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const bgStyle = {
        backgroundImage: `linear-gradient(to bottom, ${BgImg.top}, ${BgImg.bottom})`
    };
    return (
        <div style={bgStyle} className="h-full">
            Scroll down to change the background color!
        </div>
    );
};
