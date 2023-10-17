'use client'
import { useEffect } from "react";

export type ToastProps = {
    children: React.ReactNode;
    duration?: number;
    onHide: () => void;
}

export const Toast = ({ children, duration = 800, onHide }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(onHide, duration);
        return () => clearTimeout(timer);
    }, [duration, onHide]);

    return (
        <div className="
            z-20 fixed bottom-20 l flex items-center justify-center animate-fadeInOut
             bg-black text-white h-10 rounded-sm text-sm left-60 right-60"
        >
            {children}
        </div>
    );
}
