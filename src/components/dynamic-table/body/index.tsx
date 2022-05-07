import { TableBody } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bodyActions, Column } from "../../store/body-slice";
import wait from "../../utilities/wait";
import useBodyRows from "./useBodyRows";

interface ColumnForBody extends Column{
    element:(params:Column)=>ReactNode
}

interface BodyProps{
    data: {
        [id:string]:{
            id: string, 
            columns: {[columnId:string]: ColumnForBody}
        }
    }
}

export default function DynamicTableBody(props:BodyProps){
    const elementCallbacks = useState<any>({}) 
    const dispatch = useDispatch() 
    const rows = useBodyRows() 
    const loading:boolean = useSelector((s:any) => s.body.loading)

    useEffect(()=>{
        async function effect(){
            dispatch(bodyActions.startLoad())
            await wait()
            const data = Object.values(props.data)
        }
    },[])
    return (
        <TableBody>
            
        </TableBody>
    )
}