import { CaseReducer, createReducer, createSelector, createSlice,  PayloadAction } from "@reduxjs/toolkit";
import { selectActiveColumn, selectSortDirection } from "./header-slice";



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

export const selectBodyData:(state:any) => Rows = (state) => state.body.rows
export const selectBodyMax:(state:any) => number = (state) => state.body.max 
export const selectBodySearchBy:(state:any)=>string = state => state.body.filterBy 
export const selectBodyGroupBy:(state:any)=>(string|null) = state => state.body.filterByColumn
export const selectBodyGroupMatch:(state:any)=>(string|null) = state => state.body.filterByColumnMatch


// export const selectByColumn = createSelector(selectBodyData, selectActiveColumn, (rows, column) => {
//     return Object.values(rows).map(row => {
//         const value:string|number = row.columns[column].value === null ? "" : typeof (row.columns[column].value) === "string" ? String(row.columns[column].value) : Number(row.columns[column].value)
//         return  {id:row.id, value}
//     })
// })

// interface Row{
//     id: string, 
//     columns: {[columnId: string]: Column}
// }

// export const selectSortedRows = createSelector(selectBodyData, selectByColumn, selectSortDirection, (rows, byColumn, direction) => {
//     const sorted = byColumn.sort((a,b) =>{
//         if(direction === "asc") return  +(a.value > b.value) || +(a.value === b.value) - 1;
//         return  (+(a.value > b.value) || +(a.value === b.value) - 1) * -1
//     })
//     const result:Row[] = sorted.map(row => {
//         return rows[row.id]
//     })
//     return result
// })
