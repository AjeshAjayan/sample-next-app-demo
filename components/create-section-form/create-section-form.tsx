import { Alert, Button, Card, CardActions, CardContent, Grid, Slide, Snackbar, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { SectionState } from "../../models/section.interface";
import { deleteSection, updateSection } from "./website-section-slice";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { addWebSections, deleteWebSection, updateWebSection } from "../../pages/api/web-sections";
import componentStyles from './create-section-form.module.css';
import SnackbarSuccess from "../snackbar-success/snackbar-success";

type CreateSectionFormProps = {
    index: number;
} & SectionState;

export default function CreateSectionForm({
    _id,
    index,
    title,
    subtitle,
    content
}: CreateSectionFormProps) {

    const dispatch = useDispatch();

    const [currentSection, setCurrentSection] = useState<SectionState>({
        _id,
        title,
        subtitle,
        content
    });

    const [isSaving, setIsSaving] = useState<boolean>(false);

    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    const [isDeteting, setIsDeleting] = useState<boolean>(false);

    const [openSavedSuccessSnackbar, setOpenSavedSuccessSnackbar] = useState(false);

    const [successMessage, setSuccessMessage] = useState<string>('');

    useEffect(() => {
        setCurrentSection({
            _id,
            title,
            subtitle,
            content
        });
    }, [_id, title, subtitle, content])

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
            setSuccessMessage(response.message!);
            setOpenSavedSuccessSnackbar(true);
        }).catch(err => {
            setIsSaving(false);
            setSuccessMessage('');
        });
    }

    const handleUpdateClick = () => {
        setIsUpdating(true);
        updateWebSection(currentSection).then((response) => {
            dispatch(updateSection({ ...(response.result!), index }))
            setIsUpdating(false);
            setSuccessMessage(response.message!);
            setOpenSavedSuccessSnackbar(true);
        }).catch(err => {
            setIsUpdating(false);
        });
    }
    
    const handleDeleteClick = () => {
        setIsDeleting(true);
        deleteWebSection(_id!).then(data => {
            dispatch(deleteSection({
                index,
            }));
        }).catch(err => {
            setIsDeleting(false);
        })
    }

    const handleSnackbarClose = () => {
        setOpenSavedSuccessSnackbar(false);
    }

    return (
        <>
            <SnackbarSuccess
                message={successMessage}
                open={openSavedSuccessSnackbar}
                duration={3000}
                onClose={handleSnackbarClose} />

            <Card className={componentStyles.main} variant="outlined" sx={{ overflow: 'auto' }}>
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
                    {
                        !currentSection._id
                            ? <LoadingButton
                                color="primary"
                                onClick={handleSaveClick}
                                loading={isSaving}
                                loadingPosition="start"
                                startIcon={<SaveIcon />}
                                variant="contained"
                            >
                                Save
                            </LoadingButton>
                            : <LoadingButton
                                color="warning"
                                onClick={handleUpdateClick}
                                loading={isUpdating}
                                loadingPosition="start"
                                startIcon={<SaveIcon />}
                                variant="contained"
                            >
                                Update
                            </LoadingButton>
                    }
                </CardActions>
            </Card>
        </>
    );
}
