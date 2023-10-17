'use client'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './store'

type initialStateProp = {
    color: string[],
    palette: string[],
}

const getinitialState = () => {
    let state;
    if (global?.window !== undefined){
        const clipboard: string | initialStateProp = localStorage.getItem("clipboard") || {
            color: [],
            palette: [],
        }
        if (typeof clipboard === "string") {
            state = JSON.parse(clipboard)
        }
        return state
    }
}

const initialState = getinitialState() 


export const clipboardSlice = createSlice({
    name: 'clipboard',
    initialState,
    reducers: {
        addSingleColor : (state:initialStateProp, {payload}:PayloadAction<string>) => {
            if (!state.color.includes(payload) && state.color.length <= 50 ) {
                state.color.push(payload);
                localStorage.setItem("clipboard", JSON.stringify(state))
            }
            return state
        },
        minusSingleColor : (state: initialStateProp, {payload}:PayloadAction<string>) => {
            state.color.filter((item)=> item !== payload)
            localStorage.setItem("clipboard", JSON.stringify(state))
        },
        removeAllSingleColor : (state: initialStateProp) => {
            state.color = []
        }
    }
})

export const {addSingleColor, minusSingleColor, removeAllSingleColor} = clipboardSlice.actions
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector




