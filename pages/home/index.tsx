import { Button, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import CreateSectionForm from "../../components/create-section-form";
import NavbarLayout from "../../lib/navbar-layout.decorator";
import { selectSections, addSection } from "../../store/website-section-slice";

export default function Home() {

    const dispatch = useDispatch();

    const sections = useSelector(selectSections);

    const handleAddSectionClick = () => {
        dispatch(
            addSection({
                title: '',
                subtitle: '',
                content: ''
            })
        );
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
                                    title={section.title}
                                    subtitle={section.subtitle}
                                    content={section.content}
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

NavbarLayout(Home);
