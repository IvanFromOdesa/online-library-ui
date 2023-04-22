import React, { useEffect, useState } from "react";
import WidgetWrapper from "components/WidgetWrapper";
import {
    List,
    ListItemButton,
    ListItemText,
    Pagination,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { Stack } from "@mui/system";
import { beautifyText } from "textFormatting";
import { useSelector } from "react-redux";

const CategoriesWidget = () => {
    const [pageNum, setPageNum] = useState(0);
    const [pageCount, setPageCount] = useState(1);
    const [startElement, setStartElement] = useState(0);
    const [genres, setGenres] = useState(0);

    const token = useSelector((state) => state.token);

    const { palette } = useTheme();
    const dark = palette.neutral.dark;

    const isNonMobileScreens = useMediaQuery("(min-width:1600px)");

    useEffect(() => {
        setStartElement(pageNum * 26);
    }, [pageNum]);

    useEffect(() => {
        const getGenres = async () => {
            const response =
                await fetch('http://localhost:8080/api/v1/books/genres',
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        },
                    });
            const data = await response.json();
            if (response.ok) {
                setGenres(beautifyText(data));
                setPageCount(Math.ceil(data.length / 26));
            }
        };
        getGenres();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const createList = (from, to) => {
        return (
            <List>
                {
                    genres && genres.slice(from, to).map(genre => (
                        <ListItemButton>
                            <ListItemText
                                primaryTypographyProps={isNonMobileScreens ? {
                                    fontSize: "20px",
                                    fontWeight: "bold"
                                } : {
                                    fontSize: "18px",
                                    fontWeight: "bold"
                                }}
                                primary={genre} />
                        </ListItemButton>
                    ))
                }
            </List>
        )
    }

    return (
        <WidgetWrapper>
            <Typography
                fontWeight="bold"
                fontSize="38px"
                gap="0.5rem"
                pb="1.1rem"
                color={dark}
            >
                Categories
            </Typography>
            <FlexBetween sx={{ justifyContent: "space-evenly" }}>
                {createList(startElement, startElement + 13)}
                {createList(startElement + 13, startElement + 26)}
            </FlexBetween>
            <Stack alignItems="center">
                <Pagination
                    count={pageCount}
                    onChange={(e, value) => setPageNum(value - 1)}
                    size="large"
                    shape="rounded"
                />
            </Stack>
        </WidgetWrapper>
    )
}

export default CategoriesWidget;