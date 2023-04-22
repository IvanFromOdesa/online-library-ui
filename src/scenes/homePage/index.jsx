import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "scenes/navbar";
import BooksWidget from "scenes/widgets/BooksWidget";
import CategoriesWidget from "scenes/widgets/CategoriesWidget";
import BooksLit from "scenes/widgets/BooksLit";

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreens ? "55%" : undefined}>
                    <BooksWidget />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "40%" : undefined}
                    mt={isNonMobileScreens ? undefined : "1rem"}
                >
                    <CategoriesWidget />
                </Box>
            </Box>
            <br />
            <BooksLit />
        </Box>
    )
}

export default HomePage;