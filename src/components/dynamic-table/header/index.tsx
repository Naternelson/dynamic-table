import { SxProps, TableHead, TableRow, TableRowProps } from "@mui/material";
import { PropsWithChildren } from "react";
import SelectHeaderCell from "./select-cell";

interface HeaderProps{
    selectCell?: boolean,
    sx?: SxProps 
}

export default function DynamicHeader(props:PropsWithChildren<HeaderProps>){
    const {children, sx, selectCell} = props
    const rowProps:TableRowProps = {sx:{ ...sx}}
    const includeSelectCell = selectCell === false ? false : true 
    return (
        <TableHead >
            <TableRow {...rowProps}>
                {includeSelectCell && <SelectHeaderCell/>}
                {children}
            </TableRow>
        </TableHead>
    )
}