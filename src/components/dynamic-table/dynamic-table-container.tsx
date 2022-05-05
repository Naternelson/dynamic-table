import { BoxProps, Box} from "@mui/material"
import { PropsWithChildren } from "react"

interface DynamicTableContainerProps{
    containerProps?: BoxProps
}
export default function DynamicTableContainer(props:PropsWithChildren<DynamicTableContainerProps>){
    const propsContainer = props.containerProps || {}
    const containerProps:BoxProps = {flex:1, overflow:'hidden', display:'flex', flexDirection:'column', ...propsContainer}
    return (
        <Box {...containerProps}>
            {props.children}
        </Box>
    )
}