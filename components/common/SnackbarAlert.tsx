import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

type PropsType = {
    autoHideDuration?: number
    open: boolean
    onClose: () => void
    message: string
    type: AlertMessageType
}
export enum AlertMessageType {
    sucess = "success",
    error = "error",
    warning = "warning",
    info = "info"
}
export default function SnackBarAlert(props: PropsType) {

    return (
        <Snackbar
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
            }}
            open={props.open}
            autoHideDuration={props.autoHideDuration || 2000}
            onClose={props.onClose}
        >
            <Alert onClose={props.onClose} severity={props.type}>
                {props.message}
            </Alert>
        </Snackbar>

    );
}