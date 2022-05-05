import { TableCell, TableCellProps } from "@mui/material";
import { PropsWithChildren, PropsWithoutRef } from "react";

export default function HeaderCell(props:PropsWithChildren<TableCellProps>){

    const {sx, children, ...p} = props
    const s = sx || {}
    const cellProps: TableCellProps = {variant:'head', size:'small', padding: 'normal', align: 'left', ...p, sx:{borderColor: 'primary.light', backgroundColor: 'grey.100', color: 'primary.dark', ...s}}
    return (
        <TableCell {...cellProps}>
            {props.children}
        </TableCell>
    )
}