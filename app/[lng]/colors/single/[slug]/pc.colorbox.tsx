'use client'
import { useState } from 'react';
import { Toast } from '@/app/widget/toast';
import useSWR from 'swr';
import { useParams } from 'next/navigation';
import { useAppDispatch } from '@/app/redux/clipboard';
import { addSingleColor } from '@/app/redux/clipboard';
import {LoadingState} from '@/app/widget/loading';
const fetcher = (url:string) => fetch(url).then((res) => res.json());
const ITEMS_PER_PAGE = 360;

type ToastState = {
    hex: string|null
    isClicked: boolean
}
export const SingleColorBox =()=> {
    const dispatch =useAppDispatch()
    const params = useParams() as Record<string, string | string[]>
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [showToast, setToast] = useState<ToastState>({
        hex: null,
        isClicked: false
    });
    const { data, error } = useSWR(`/api/color/${params.slug}`, fetcher);
    if (error) return <div>Failed to load {error}</div>;
    if (!data) return <LoadingState />;
    if (data.error) return <div>Error not such file {data.error.message}</div>
    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
    const currentdata = data.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    const handlePageChange = (event: any, value:number) => {
    setCurrentPage(value);
    };
    const handleClick =(hex:string) => {
        navigator.clipboard.writeText(hex).then(() => setToast({
            hex: hex,
            isClicked: true
        }))
        dispatch(addSingleColor(hex))
    }
    const hideToast =()=> setToast({
        hex: null,
        isClicked: false
    });

    return (
        <>
            <section className="w-full h-dashboard grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 p-8 text-sm">
                {currentdata.map((color:any) => (
                    <section 
                        key={color.id} 
                        style={{ backgroundColor: color.hex }}
                        className="w-24 h-24 rounded-full flex items-center justify-center"
                        onClick={()=>handleClick(color.hex)}
                    >
                        {color.hex}
                    </section>
                ))}
            </section>
            {showToast.isClicked && <Toast onHide={hideToast}>
                {`Color ${showToast.hex} copied to clipboard!`}
            </Toast>}
        </>
    )
}
