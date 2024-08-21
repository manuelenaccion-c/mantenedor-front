import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export default function Footer() {
    return (
        <Paper sx={{
            marginTop: 'calc(10% + 60px)',
            position: 'fixed',
            bottom: 0,
            width: '100%',
            backgroundColor: '#282A3A'
        }} component="footer" square variant="outlined">
            <Container maxWidth="lg">
                <Box
                    sx={{
                        flexGrow: 1,
                        justifyContent: "center",
                        display: "flex",
                        my: 1
                    }}
                >

                </Box>
                <Box
                    sx={{
                        flexGrow: 1,
                        justifyContent: "center",
                        display: "flex",
                        mb: 2,
                    }}
                >
                    <Typography variant="p" color="initial" sx={{ color: 'white' }}>
                        Copyright ©2024
                    </Typography>
                </Box>
            </Container>
        </Paper>
    );
}