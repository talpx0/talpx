'use client'
import { ReactNode } from "react"


export const FirstPageWrapper =({children}:{ children: ReactNode})=> {
    return(
        <section className="h-dashboard snap-mandatory overflow-y-scroll w-full no-scrollbar scroll-smooth snap-y">
            {children}
        </section>
    )
}
/*Event Listener on the Wrong Element: Your useMandatoryScroll hook is listening to the scroll event on the window object. However, the FirstPageWrapper component you've provided is using a scrollable <section> element (overflow-y-scroll). This means that when you scroll inside the FirstPageWrapper, it's the <section> element that's scrolling, not the window. Thus, the handleScroll function in your hook is never triggered.*/ 