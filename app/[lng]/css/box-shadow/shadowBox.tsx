'use client'
import { Toast } from "@/app/widget/toast";
import { useState } from "react";
import useSWR from "swr";

type BoxshadowsProp = {
    id: number|null
    isClicked: boolean
}
const fetcher = (url:string) => fetch(url).then((res) => res.json());
export const ShadowBox =()=> {
    const [showToast, setToast] = useState<BoxshadowsProp>({
        id: null,
        isClicked: false
    });
    const { data, error } = useSWR(`/api/css/boxShadow`, fetcher);
    if (error) return <div>Failed to load {error}</div>;
    if (!data) return <div>Loading...</div>;
    console.log(data);
    
    const hideToast =()=> setToast({
        id: null,
        isClicked: false
    })

    return(
        <section className="flex flex-wrap h-full">
            {data.map((boxShadow:any) => 
                <section key={boxShadow.id} className="flex flex-wrap items-center justify-center h-45 w-1/5">
                    <div 
                        className="bg-white rounded flex items-center justify-center h-32 w-32 m-5 dark:text-gray-900"
                        style={{ boxShadow: boxShadow.name }}
                        onClick={() => navigator.clipboard.writeText(`box-shadow: ${boxShadow.name};`)
                            .then(() => setToast({
                                id: boxShadow.id,
                                isClicked: true})
                            )  
                        }>
                        <span>{boxShadow.id}</span>
                    </div>                    
                </section>
            )}
             {showToast.isClicked && <Toast onHide={hideToast}>
                {`Box-shadow ${showToast.id} copied to clipboard!`}
            </Toast>}
    </section>

    )
}