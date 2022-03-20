import { Box, Divider, Grid, Typography } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import SnackbarError from "../../src/components/snackbar-error/snackbar-error";
import WebsectionSkeleton from "../../src/components/websection-skeleton/websection-skeleton";
import NavbarLayout from "../../src/lib/navbar-layout-warper"
import { SectionState } from '../../src/models/section.interface'
import { ServerResponse } from "../../src/models/server-response";
import { getWebSections } from "../api/web-sections";

export default function Preview() {

    const [openErrorSnackbar, setOpenErrorSnackbar] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [webSections, setWebSections] = useState<SectionState[]>([]);

    useEffect(() => {

        getWebSections().then(response => {
            setWebSections(response.result ?? []);
            setTimeout(() => {
                setIsLoading(false);
            }, 300)
        }).catch((err: ServerResponse<undefined>) => {
            setErrorMessage(err.message ?? 'Something went wrong');
            setOpenErrorSnackbar(true);
            setIsLoading(false);
        })

        return cleanUp;
    }, []);

    const cleanUp = () => { };

    return <>
        <Head>
            <title>Preview</title>
        </Head>

        <SnackbarError
            message={errorMessage}
            duration={6000}
            open={openErrorSnackbar}
            onClose={() => setOpenErrorSnackbar(false)} />

        <Box sx={{ overflow: 'auto', height: '88vh', margin: '1rem' }}>
            {
                isLoading

                    ? <section role="skeleton">
                        <WebsectionSkeleton />
                        <br />
                        <WebsectionSkeleton />
                        <br />
                        <WebsectionSkeleton />
                    </section>

                    : webSections.map(w => {
                        return (
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                                <Grid md={11}>
                                    <Grid md={4}>
                                        <Typography variant="h3">
                                            {w.title}
                                        </Typography>
                                    </Grid>
                                    <Grid md={8}>
                                        <Typography variant="h6">
                                            {w.subtitle}
                                        </Typography>
                                    </Grid>

                                    <Grid md={12} sx={{ marginTop: '2rem' }}>
                                        <Typography variant="body1">
                                            {w.content}
                                        </Typography>
                                    </Grid>
                                    <Divider flexItem />
                                </Grid>
                            </Box>
                        )
                    })
            }
        </Box>
    </>
}

NavbarLayout(Preview, true);
