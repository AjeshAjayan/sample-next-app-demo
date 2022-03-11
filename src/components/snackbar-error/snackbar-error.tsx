import { Snackbar, Slide, Alert } from "@mui/material";
type SnackbarErrorProps = {
    message: string,
    duration: number,
    open: boolean,
    onClose: () => void
}

export default function SnackbarError(props: SnackbarErrorProps) {

    return <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={props.open}
        autoHideDuration={props.duration}
        onClose={props.onClose}>
        <Slide in={props.open} direction="up" mountOnEnter unmountOnExit>
            <Alert severity="error" sx={{ width: '100%' }} onClose={props.onClose}>
                { props.message }
            </Alert>
        </Slide>
    </Snackbar>
}