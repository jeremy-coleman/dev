import * as React from "react";
import {Snackbar} from "material-ui/Snackbar";

export const isError = (x: any): x is { message: string } => {
    return null !== x && typeof x !== "undefined" && typeof x.message === "string";
};
export const ErrorView = (props: { viewModel: { error: Error } }) => {
    const error = props.viewModel.error;
    const message = error ? error.message : "";
    const open = isError(error);
    return (
        <Snackbar
            open={open}
            message={message}
            autoHideDuration={0}
            bodyStyle={{ backgroundColor: "red" }}
        />
    );
};