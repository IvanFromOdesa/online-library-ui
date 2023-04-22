import React from "react";
import ShelfImage from "assets/shelf.png"
import Navbar from "scenes/navbar";
import { Box, Typography, useTheme } from "@mui/material";
import BooksLit from "scenes/widgets/BooksLit";

const FavPage = () => {
    const { palette } = useTheme();

    const dark = palette.neutral.dark;
    const main = palette.primary.main;


    return (
        <div>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
            >
                <Box
                    display="flex"
                    margin="auto"
                >
                    <Box>
                        <Typography
                            fontWeight="bold"
                            fontSize="38px"
                            gap="0.5rem"
                            pb="1.1rem"
                            color={main}
                        >
                            Your favorites
                        </Typography>
                        <Typography
                            fontWeight="bold"
                            fontSize="24px"
                            color={dark}
                        >
                            Here you can view and manage your personal collection of favorites books.
                        </Typography>
                    </Box>
                </Box>
                <div style={{
                    textAlign: "center",
                    marginTop: "8rem"
                }}>
                    <img src={ShelfImage} width="50%" height="50%" alt="shelf" />
                </div>
            </Box>
            <br />
            <BooksLit />
        </div>
    )
}

export default FavPage;