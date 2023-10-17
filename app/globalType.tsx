import {ReactNode} from 'react'

export type ParamProps = {
    params: {
        lng: string
        slug: string
        theme: string
    }
    children? : ReactNode
}