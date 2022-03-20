import {
    AppBar,
    Box,
    Button,
    Grid,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import SnackbarError from "../snackbar-error/snackbar-error";
import navbarStyles from './navbar.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type NavbarProp = { children: JSX.Element, showBackButton: boolean }

export default function Navbar({ children, showBackButton }: NavbarProp) {

    const router = useRouter();
    const [isRouting, setIsRouting] = useState(false);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        router.events.on('routeChangeStart', handleRouteChange);
        router.events.on('routeChangeComplete', handleRouteChangeComplete);
        router.events.on('routeChangeError', handleRouteChangeError);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
            router.events.off('routeChangeComplete', handleRouteChangeComplete);
            router.events.off('routeChangeError', handleRouteChangeError);
        }
    }, [])

    const handleRouteChange = () => {
        setIsRouting(true);
    }

    const handleRouteChangeComplete = () => {
        setIsRouting(false);
    }

    const handleRouteChangeError = () => {
        setIsRouting(false);
    }

    const handleBackButtonOnClick = () => {
        router.back();
    }

    return <>
        <SnackbarError
            message="Something went wrong"
            open={showError}
            duration={5000}
            onClose={() => setShowError(false)} />
        <Grid container sx={{ flexDirection: 'column' }}>
            <Box sx={{ flexGrow: 1, position: 'relative' }}>
                <AppBar position="static">
                    <Toolbar variant="regular" sx={{ justifyContent: 'space-between' }}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: '5px',
                            alignItems: 'center'
                        }}>
                            {
                                showBackButton && <IconButton
                                    onClick={handleBackButtonOnClick}
                                    sx={{ color: 'white' }}>
                                    <ArrowBackIcon />
                                </IconButton>
                            }
                            <Link href="/home">
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="div"
                                    sx={{ display: { xs: 'none', sm: 'block', cursor: 'pointer' } }}
                                >
                                    Rawbiti
                                </Typography>
                            </Link>
                        </Box>

                        <Box>
                            <Button
                                key="preview"
                                onClick={() => {
                                    router.push('/home/preview')
                                }}
                                sx={{ color: 'white' }}
                            >
                                Preview
                            </Button>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-haspopup="true"
                                onClick={() => { }}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </Box>

                    </Toolbar>
                </AppBar>
                {isRouting && <LinearProgress className={navbarStyles.linearProgress} color="success" />}
            </Box>
            {children}
        </Grid>
    </>
}