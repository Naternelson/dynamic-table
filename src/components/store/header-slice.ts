import { SortDirection, TableCellProps } from "@mui/material";
import { CaseReducer, createSlice, CreateSliceOptions, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";

type Align = "center" | "inherit" | 'justify' | 'left' | 'right'
type Padding = 'checkbox' | 'none' | 'normal'
type Size = 'small' | 'medium' 
type Header = {
    [id:string]:{
        id: string, 
        value:string, 
        align: Align
        padding: Padding, 
        size: Size
    } 
}

interface HeaderState{
    order: string[],
    direction: SortDirection,
    active: string,
    headers: Header
}
const initialState:HeaderState = {
    order: [],
    direction: "asc",
    active: "",
    headers: {}
}

const reset:CaseReducer = () => {
    return initialState
}

const addHeaders:CaseReducer<HeaderState, PayloadAction<Header>> = (state, action) => {
    const set = new Set(state.order)
    Object.keys(action.payload).forEach(id => set.add(id))
    state.order = Array.from(set)
    state.headers = {...state.headers, ...action.payload}
    return state 
}

const removeHeaders: CaseReducer<HeaderState, PayloadAction<string[]>> = (state, action) => {
    const set = new Set(state.order)
    action.payload.forEach(id => {
        set.delete(id)
        delete state.headers[id]
        if(state.active === id) state.active = ""
    })
    state.order = Array.from(set)
    return state 
}

const selectHeader: CaseReducer<HeaderState, PayloadAction<string>> = (state, action)  => {
    if(state.active === action.payload){
        state.direction = state.direction === "asc" ? "desc" : "asc"
        state.active = action.payload
        return state 
    }
    return {...state, active: action.payload, direction: 'asc'}
}

const unselectHeader: CaseReducer<HeaderState> = (state) => {
    return {...state, active: ""}
}
const setDirection: CaseReducer<HeaderState, PayloadAction<SortDirection>> = (state, action)=> {
    return {...state, direction: action.payload || "asc"}
}
const updateHeader: CaseReducer<HeaderState, PayloadAction<Header>>  = (state, action) => {
    return addHeaders(state, action)
}

export const headerSlice = createSlice({
    name:'headers',
    initialState,
    reducers: {reset, addHeaders, removeHeaders, selectHeader, unselectHeader, setDirection, updateHeader}
})
export const headerActions = headerSlice.actions
export const headerReducer = headerSlice.reducer