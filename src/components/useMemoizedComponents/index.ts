import { useRef } from "react"
import {isEqual} from "lodash"
export function useMemoValue(value:any){
    const ref = useRef<any[]>([null, null, null, null, null])
    const v = ref.current.find((val) => isEqual(value, val))
    if(v !== undefined) return v 
    ref.current.unshift(value)
    ref.current.pop()
    return value 
}

export function useMemoDeps(...deps: any[]){
    return deps.map(useMemoValue)
}