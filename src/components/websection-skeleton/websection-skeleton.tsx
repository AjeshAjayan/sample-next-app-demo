import { Box, Grid, Typography, Skeleton } from "@mui/material"

export default function WebsectionSkeleton() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            <Grid md={11}>
                <Grid md={4}>
                    <Typography variant="h3">
                        <Skeleton variant="text" />
                    </Typography>
                </Grid>
                <Grid md={8}>
                    <Typography variant="h6">
                        <Skeleton variant="text" />
                    </Typography>
                </Grid>

                <Grid md={12} sx={{marginTop: '2rem'}}>
                    <Typography variant="body1">
                        <Skeleton variant="text" />
                    </Typography>
                </Grid>
                <Grid md={12}>
                    <Typography variant="body1">
                        <Skeleton variant="text" />
                    </Typography>
                </Grid>
                <Grid md={12}>
                    <Typography variant="body1">
                        <Skeleton variant="text" />
                    </Typography>
                </Grid>
                <Grid md={12}>
                    <Typography variant="body1">
                        <Skeleton variant="text" />
                    </Typography>
                </Grid>
                <Grid md={12}>
                    <Typography variant="body1">
                        <Skeleton variant="text" />
                    </Typography>
                </Grid>
                <Grid md={12}>
                    <Typography variant="body1">
                        <Skeleton variant="text" />
                    </Typography>
                </Grid>
                <Grid md={12}>
                    <Typography variant="body1">
                        <Skeleton variant="text" />
                    </Typography>
                </Grid>
                <Grid md={12}>
                    <Typography variant="body1">
                        <Skeleton variant="text" />
                    </Typography>
                </Grid>
                <Grid md={12}>
                    <Typography variant="body1">
                        <Skeleton variant="text" />
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}