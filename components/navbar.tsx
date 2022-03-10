import {
    AppBar,
    Box,
    Button,
    Grid,
    IconButton,
    Toolbar,
    Typography
} from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useRouter } from "next/router";
import Link from "next/link";

type NavbarProp = { children: JSX.Element } 

export default function Navbar({ children }: NavbarProp ) {

    const router = useRouter();

    return <Grid container sx={{ flexDirection: 'column' }}>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar variant="regular" sx={{ justifyContent: 'space-between' }}>
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
        </Box>
        {children}
    </Grid>
}