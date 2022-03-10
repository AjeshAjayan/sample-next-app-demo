import { Alert, Button, Card, CardActions, CardContent, Grid, Slide, Snackbar, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { SectionState } from "../models/section.interface";
import { deleteSection, updateSection } from "../store/website-section-slice";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { addWebSections } from "../pages/api/web-sections";

type CreateSectionFormProps = {
    index: number;
} & SectionState;

export default function CreateSectionForm({
    index,
    title,
    subtitle,
    content
}: CreateSectionFormProps) {

    const dispatch = useDispatch();

    const [currentSection, setCurrentSection] = useState<SectionState>({
        title,
        subtitle,
        content
    });

    const [isSaving, setIsSaving] = useState<boolean>(false);

    const [isDeteting, setIsDeleting] = useState<boolean>(false);

    const [deleteSnackbar, setDeleteSnackbar] = useState(false);

    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

    const [openSavedSuccessSnackbar, setOpenSavedSuccessSnackbar] = useState(false);

    const handleContentKeyUp = (value: string) => setCurrentSection({
        ...currentSection,
        content: value
    });

    const handleTitleKeyUp = (value: string) => setCurrentSection({
        ...currentSection,
        title: value
    });

    const handleSubtileKeyUp = (value: string) => setCurrentSection({
        ...currentSection,
        subtitle: value
    });

    const handleSaveClick = () => {
        setIsSaving(true);
        addWebSections(currentSection).then((response) => {
            dispatch(updateSection({ ...(response.result!), index }))
            setIsSaving(false);
            setOpenSavedSuccessSnackbar(true);
        }).catch(err => {
            setIsSaving(false);
            setOpenErrorSnackbar(true)
        });
    }
    
    const handleDeleteClick = () => {
        setIsDeleting(true);
        dispatch(deleteSection({
            index,
            onFailure: () => {
                setIsDeleting(false);
                setDeleteSnackbar(true);
            }
        }));
    }

    const handleSnackbarClose = () => {
        setDeleteSnackbar(false);
        setOpenErrorSnackbar(false);
        setOpenSavedSuccessSnackbar(false);
    }

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={deleteSnackbar}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}>
                <Slide in={deleteSnackbar} direction="up" mountOnEnter unmountOnExit>
                    <Alert severity="warning" sx={{ width: '100%' }} onClose={handleSnackbarClose}>
                        Can't delete last section
                    </Alert>
                </Slide>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={openErrorSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}>
                <Slide in={openErrorSnackbar} direction="up" mountOnEnter unmountOnExit>
                    <Alert severity="error" sx={{ width: '100%' }} onClose={handleSnackbarClose}>
                        Something went wrong
                    </Alert>
                </Slide>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={openSavedSuccessSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}>
                <Slide in={openSavedSuccessSnackbar} direction="up" mountOnEnter unmountOnExit>
                    <Alert severity="success" sx={{ width: '100%' }} onClose={handleSnackbarClose}>
                        Section saved successfully
                    </Alert>
                </Slide>
            </Snackbar>
            <Card variant="outlined" sx={{ overflow: 'auto' }}>
                <CardContent>
                    <Typography variant="h6">
                        {currentSection.title ? currentSection.title : `Section ${index + 1}`}
                    </Typography>
                    <Grid container spacing={5}>
                        <Grid item md={4}>
                            <TextField
                                fullWidth
                                id="title"
                                label="Title"
                                onKeyUp={(event) => handleTitleKeyUp((event.target as any).value)}
                                defaultValue={currentSection.title}
                                variant="outlined" />
                        </Grid>
                        <Grid item md={8}>
                            <TextField
                                fullWidth
                                id="subtitle"
                                label="Sub title"
                                onKeyUp={
                                    (event) => handleSubtileKeyUp((event.target as any).value)
                                }
                                defaultValue={currentSection.subtitle}
                                variant="outlined" />
                        </Grid>
                        <Grid item md={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={15}
                                id="content"
                                onKeyUp={
                                    (event) => handleContentKeyUp((event.target as any).value)
                                }
                                defaultValue={currentSection.content}
                                label="Content"
                                variant="outlined" />
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions sx={{ justifyContent: 'end' }}>
                    <LoadingButton
                        color="error"
                        onClick={handleDeleteClick}
                        loading={isDeteting}
                        loadingPosition="start"
                        startIcon={<DeleteIcon />}
                        variant="contained"
                    >
                        Delete
                    </LoadingButton>
                    <LoadingButton
                        color="primary"
                        onClick={handleSaveClick}
                        loading={isSaving}
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                    >
                        Save
                    </LoadingButton>
                </CardActions>
            </Card>
        </>
    );
}
