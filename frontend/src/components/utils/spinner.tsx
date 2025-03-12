import { CircularProgress } from "@mui/material"
export const Spinner= function(){
    return<div className="h-screen flex-col flex justify-center items-center">
        <CircularProgress color="inherit" />
    </div>
}