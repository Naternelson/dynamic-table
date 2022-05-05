import { Table, TableContainer, TableProps } from "@mui/material"
import { PropsWithChildren} from "react"

export default function DynamicTable(props:PropsWithChildren<TableProps>){
    return (
            <TableContainer>
                <Table size='small' stickyHeader {...props}>
                    {props.children}
                </Table>          
            </TableContainer>
    )
}