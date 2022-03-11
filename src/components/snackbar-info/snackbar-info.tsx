import { Snackbar, Slide, Alert } from "@mui/material";
type SnackbarInfoProps = {
    message: string,
    duration: number,
    open: boolean,
    onClose: () => void
}

export default function SnackbarInfo(props: SnackbarInfoProps) {

    return <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={props.open}
        autoHideDuration={props.duration}
        onClose={props.onClose}>
        <Slide in={props.open} direction="up" mountOnEnter unmountOnExit>
            <Alert severity="info" sx={{ width: '100%' }} onClose={props.onClose}>
                { props.message }
            </Alert>
        </Slide>
    </Snackbar>
}