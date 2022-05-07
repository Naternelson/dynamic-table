import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectBodyData, selectBodyGroupBy, selectBodyGroupMatch, selectBodyMax, selectBodySearchBy } from "../../store/body-slice";
import { selectActiveColumn, selectSortDirection } from "../../store/header-slice";
import { useMemoDeps } from "../../useMemoizedComponents";

export default function useBodyRows(){
    const rows = useSelector(selectBodyData)
    const max = useSelector(selectBodyMax)
    const activeColumn = useSelector(selectActiveColumn)
    const direction = useSelector(selectSortDirection)
    const searchBy = useSelector(selectBodySearchBy)
    const groupBy = useSelector(selectBodyGroupBy)
    const matchBy = useSelector(selectBodyGroupMatch)
    
    const selectByColumn = useMemo(()=>{
        return Object.values(rows).map(row => {
            const value:string|number = row.columns[activeColumn].value === null ? "" : typeof (row.columns[activeColumn].value) === "string" ? String(row.columns[activeColumn].value) : Number(row.columns[activeColumn].value)
            return  {id:row.id, value}
        })
    }, useMemoDeps(rows, activeColumn))

    const sortedRows = useMemo(() => {
        const sorted = selectByColumn.sort((a, b) => {
            if(direction === "asc") return  +(a.value > b.value) || +(a.value === b.value) - 1;
            return  (+(a.value > b.value) || +(a.value === b.value) - 1) * -1
        })
        return sorted.map(row => {
            return row.id 
        })
    },useMemoDeps(selectByColumn, rows, direction))

    const groupedRows = useMemo(()=>{
        if(!groupBy || !matchBy) return sortedRows
        return sortedRows.filter((id) => {
            return rows[id].columns[groupBy].value === matchBy 
        }) 

    }, useMemoDeps(sortedRows, groupBy, matchBy, rows))

    const filteredRows = useMemo(()=> {
        if(searchBy.trim() === "") return groupedRows 
        return groupedRows.filter(id=>{
            const row = rows[id]
            const searchText = Object.values(row.columns).filter(col => col.searchable === false ? false : typeof col.value === "string").map(col => col.value).join("")
            return searchText.includes(searchBy)
        })
    },useMemoDeps(groupedRows, searchBy, rows))

    return filteredRows.slice(0, max)
}
