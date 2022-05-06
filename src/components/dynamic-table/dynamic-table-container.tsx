import { BoxProps, Box} from "@mui/material"
import { PropsWithChildren } from "react"
import { Provider } from "react-redux"
import store from "../store"

interface DynamicTableContainerProps{
    containerProps?: BoxProps
}
export default function DynamicTableContainer(props:PropsWithChildren<DynamicTableContainerProps>){
    const propsContainer = props.containerProps || {}
    const containerProps:BoxProps = {flex:1, overflow:'hidden', display:'flex', flexDirection:'column', ...propsContainer}
    return (
        <Box {...containerProps}>
            <Provider store={store}>
                {props.children}
            </Provider>
        </Box>
    )
}