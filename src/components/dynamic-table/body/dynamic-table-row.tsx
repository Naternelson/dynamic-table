import { TableRow, TableRowProps } from "@mui/material"
import SelectCell from "./select-cell"

interface DynamicRowProps{
    id:string, 
    selectCell?:boolean,
}
export default function DynamicTableRow(props: DynamicRowProps){
    
    const rowProps: TableRowProps = {
        selected: Math.random() >.5,
        hover: true, 
    }
    const hasSelectCell = props.selectCell === false ? false : true 
    return (
        <TableRow {...rowProps}>
            {hasSelectCell && <SelectCell selected={!!rowProps.selected} rowId={props.id}/>}
        </TableRow>
    )
}