import React from "react";
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material"
import Form from "./Form";
import BooksImage from "assets/winter-books.jpg";
import AutoStoriesTwoToneIcon from '@mui/icons-material/AutoStoriesTwoTone';

const LoginPage = () => {
    const theme = useTheme();
    const dark = theme.palette.neutral.dark;
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    return <Grid
        display="flex"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
    >
        <Box>
            <Box
                p="0.5rem 6%"
                textAlign="center"
            >
                <Typography
                    fontWeight="bold"
                    fontSize="32px"
                    color="primary"
                >
                    Books <AutoStoriesTwoToneIcon /> <span style={{ color: dark }}>Lit</span>
                </Typography>
            </Box>

            {/* FORM BOX */}
            <Box
                paddingRight="2rem"
                borderRadius="1.5rem"
            >
                <Typography
                    fontWeight="500"
                    variant="h4"
                    textAlign="center"
                    sx={{
                        mb: "1.5rem"
                    }}
                >
                    Welcome to BooksLit, an easy-to-use online library!
                </Typography>
                <Form />
            </Box>
        </Box>
        {
            isNonMobileScreens
                ? <div>
                    <img src={BooksImage} width="625px" alt="winter-books-2023" />
                </div>
                : <></>
        }
    </Grid >
}

export default LoginPage; 