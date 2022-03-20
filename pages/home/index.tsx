import { Button, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Head from "next/head";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CreateSectionForm from "../../src/components/create-section-form/create-section-form";
import NavbarLayout from "../../src/lib/navbar-layout-warper";
import { SectionState } from "../../src/models/section.interface";
import { selectSections, addSection, setIntialSections } from "../../src/components/create-section-form/website-section-slice";
import { getWebSections } from "../api/web-sections";

type HomeProps = {
    webSections: SectionState[],
    message: string | null
}

export default function Home({ webSections, message }: HomeProps) {

    const dispatch = useDispatch();

    const sections = useSelector(selectSections);

    useEffect(() => {
        dispatch(setIntialSections(webSections))
    }, [])

    const handleAddSectionClick = () => {
        dispatch(
            addSection({
                title: '',
                subtitle: '',
                content: ''
            })
        );
    }

    if (message) {
        return <Typography sx={{ margin: '10px auto' }} variant="h3">{message}</Typography>
    }

    return (

        <>
            <Head>
                <title>Get started</title>
            </Head>
            <Box sx={{
                margin: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Typography variant="h2">
                    Let's get started...
                </Typography>
                <Typography variant="h6">
                    you can use the section below to create a website with custom data.
                    Also you can edit the data anytime you want
                </Typography>
            </Box>
            <Box sx={{
                margin: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                maxHeight: '76vh',
                overflow: 'auto'
            }}>
                {
                    sections.map((section, index) => {
                        return (
                            <div key={index}>
                                <CreateSectionForm
                                    index={index}
                                    {...section}
                                />
                            </div>
                        )
                    })
                }
                <Button
                    variant="contained"
                    onClick={handleAddSectionClick}
                    color="primary">
                    Add new section
                </Button>
            </Box>
        </>
    );
}

/**
 * in this scenario server-side rendering is not necessary
 * in fact, it is foolish to use server-side rendering in this scenario
 * so consider this only as an example for getServerSideProps
 * 
 * for these kinds of scenarios client-side rendering is the best 
 * to use so that we will not end up wasting server resources
 */
export async function getServerSideProps(): Promise<{ props: HomeProps }> {
    try {
        const webSectionsResponse = await getWebSections();

        return {
            props: {
                webSections: webSectionsResponse.result ?? [],
                message: null
            }
        }
    } catch (err: any) {
        console.log('error while fetching web sections', err.message);

        return {
            props: {
                webSections: [],
                message: "Failed to fetch data"
            }
        }
    }
}

NavbarLayout(Home, false);
