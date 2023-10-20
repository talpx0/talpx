import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from "react";

export const Drawer = ({ children, open, setOpen }: { children: ReactNode, open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) => {
    const drawerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setOpen]);

    return (
        <>
            <section> 
                <section
                    ref={drawerRef}
                    className={`fixed bg-background left-0 transition-all duration-500 ease-in-out p-5 shadow-lg rounded-b-xl w-full h-[300px] z-50 ${open ? 'top-13' : 'top-[-300px]'}`}
                >
                    {children}
                </section>
                {open && <section className="fixed top-13 left-0 h-screen w-full z-10 bg-gray-400 bg-opacity-40"></section>}
            </section>
        </>
    );
}
