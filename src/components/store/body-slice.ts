import { CaseReducer, createSlice,  PayloadAction } from "@reduxjs/toolkit";



type Align = "center" | "inherit" | 'justify' | 'left' | 'right'
type Padding = 'checkbox' | 'none' | 'normal'
type Size = 'small' | 'medium' 
type Column = {
    id: string, 
    value:string | number | null,
    type?: string ,
    color?: string,  
    align: Align
    padding: Padding, 
    size: Size,
    span: number,
    searchable?: boolean  
}
type Rows = {
    [id:string]:{
        id: string, 
        columns: {[columnId: string]: Column}
    } 
}

interface BodyState{
    max: number
    filterBy: string,
    filterByColumn: string | null 
    filterByColumnMatch: string | null
    selected: {[key:string]:boolean},
    rows: Rows
}
const initialState:BodyState = {
    max: 10000,
    filterBy: "",
    filterByColumn: null,
    filterByColumnMatch: null,  
    selected: {},
    rows: {}
}

const changeMaxSize:CaseReducer<BodyState, PayloadAction<number>> = (state, action) => {
    return {...state, max: Math.abs(action.payload)}
}


const reset:CaseReducer = () => {
    return initialState
}

const addRows:CaseReducer<BodyState, PayloadAction<Rows>> = (state, action) => {
    state.rows = {...state.rows, ...action.payload}
    const newSelected = Object.keys(action.payload).reduce((obj, id) => {
        return {...obj, [id]: false}
    },{})
    state.selected = {...state.selected, ...newSelected}
    return state 
}

const removeRows:CaseReducer<BodyState, PayloadAction<string[]>> = (state, action) => {
    action.payload.forEach(id => {
        delete state.rows[id]
    })
    return state 
}

const modifyRows: CaseReducer<BodyState, PayloadAction<Rows>> = (state, action) => {
    Object.values(action.payload).forEach(row => {
        state.rows[row.id] = {
            id: row.id,
            columns: {...state.rows[row.id].columns, ...row.columns} 
        }
    })
    return state 
}

const toggleSelections: CaseReducer<BodyState, PayloadAction<string[]>> = (state, action) => { 
    action.payload.forEach(id => {
        state.selected[id] = !state.selected[id]
    })
    return state 
}

const selectAll: CaseReducer<BodyState> = (state) => {
    state.selected = Object.keys(state.selected).reduce((obj, id) =>  {
        return {...obj, [id]: true}
    }, {})
    return state 
}

const unselectAll: CaseReducer<BodyState> = (state) => {
    state.selected = Object.keys(state.selected).reduce((obj, id) =>  {
        return {...obj, [id]: false}
    }, {})
    return state
}

const selectRows: CaseReducer<BodyState, PayloadAction<string[]>> = (state, action) => { 
    action.payload.forEach(id => {
        state.selected[id] = true 
    })
    return state 
}
const unselectRows: CaseReducer<BodyState, PayloadAction<string[]>> = (state, action) => { 
    action.payload.forEach(id => {
        state.selected[id] = false 
    })
    return state 
}

const searchBy: CaseReducer<BodyState, PayloadAction<string>> = (state, action) => {
    return {...state, filterBy: action.payload}
}

const groupBy: CaseReducer<BodyState, PayloadAction<{column: string | null, match?: string | null}>> = (state, action) => {
    const {column, match} = action.payload
    state.filterByColumn = column 
    if(!column || !match) state.filterByColumnMatch = null 
    return state 
}

const ungroup: CaseReducer<BodyState> = (state) => {
    return {
        ...state, 
        filterByColumn: null, 
        filterByColumnMatch: null 
    }
}

export const headerSlice = createSlice({
    name:'headers',
    initialState,
    reducers: {
        reset, addRows, toggleSelections, selectAll, unselectAll, removeRows, 
        modifyRows, selectRows, unselectRows, searchBy, groupBy, ungroup, changeMaxSize}
})
export const bodyActions = headerSlice.actions
export const bodyReducer = headerSlice.reducer