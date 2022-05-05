import faker from "@faker-js/faker"
import { BoxProps, Box, TableContainer, Table, TableRow, TableCell, Checkbox, TableHead, TableBody, Button } from "@mui/material"
import { PropsWithChildren, ReactNode, useEffect, useState } from "react"

interface DynamicTableContainerProps{
    containerProps?: BoxProps
}
export default function DynamicTableContainer(props:PropsWithChildren<DynamicTableContainerProps>){
    const containerProps:BoxProps = {flex:1, overflow:'hidden', display:'flex', flexDirection:'column', ...(props.containerProps || {})}
    return (
        <Box {...containerProps}>
            {props.children}
        </Box>
    )
}