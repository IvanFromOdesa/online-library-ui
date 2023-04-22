import React from "react";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import CopyrightIcon from '@mui/icons-material/Copyright';

const BooksLit = () => {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;

    const isNonMobileScreens = useMediaQuery("(min-width:1600px)");

    return (
        <Typography
            sx={isNonMobileScreens ? {
                fontWeight: "bold",
                fontSize: "18px",
            } : {
                fontWeight: "bold",
                fontSize: "16px",
            }}
            color={dark}
            textAlign="center"
        >
            <CopyrightIcon sx={{ pt: "7px" }} /> &nbsp;
            2023 &nbsp; bookslit.com &nbsp; All rights reserved
        </Typography>
    )
}

export default BooksLit;