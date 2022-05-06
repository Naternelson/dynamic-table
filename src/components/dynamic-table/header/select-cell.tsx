import { Checkbox, CheckboxProps, TableCellProps } from "@mui/material";
import HeaderCell from "./table-head-cell";

interface SelectHeaderCellProps{
    cellProps?: TableCellProps,
    checkboxProps?:CheckboxProps
}
export default function SelectHeaderCell(props:SelectHeaderCellProps){
    const cellProps:TableCellProps = {padding: "checkbox", align:'center', ...(props.cellProps || {})} 
    const checkboxProps:CheckboxProps = {size:"small", ...(props.checkboxProps || {})}
    return (
        <HeaderCell {...cellProps}>
            <Checkbox {...checkboxProps}/>
        </HeaderCell>
    )
}