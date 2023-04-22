import React from "react";
import {
    Box,
    Typography,
    Divider,
    useTheme,
    Button,
    LinearProgress,
    useMediaQuery,
    Pagination,
} from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setBooks, setLoading } from "state";
import { Stack } from "@mui/system";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import FlexBetween from "components/FlexBetween";
import { beautifyText } from "textFormatting";

const BooksWidget = () => {
    const [pageNum, setPageNum] = useState(0);
    const [pageCount, setPageCount] = useState(1);
    const [addedFavs, addFav] = useState([]);
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const navigate = useNavigate();

    const books = useSelector((state) => state.books);
    const token = useSelector((state) => state.token);
    const loading = useSelector((state) => state.loading);

    const dark = palette.neutral.dark;
    const main = palette.primary.main;

    const isNonMobileScreens = useMediaQuery("(min-width:1600px)");

    function getGenres(book) {
        let genres = book.genres;
        genres = beautifyText(genres);
        return genres.join(', ');
    }

    useEffect(() => {
        const getBooks = async () => {
            dispatch(setLoading());
            const response =
                await fetch(`http://localhost:8080/api/v1/books?page_num=${pageNum}`,
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        },
                    });
            const data = await response.json();
            if (response.ok) {
                dispatch(
                    setBooks({
                        books: data
                    })
                );
            }
        };
        getBooks();
    }, [token, dispatch, pageNum]);

    useEffect(() => {
        // Mark user favorites
        if (books) {
            books.forEach(function (book) {
                if (book.favorite) {
                    addFav(addedFavs => [...addedFavs, book.id]);
                }
            });
        }
    }, [books]);

    useEffect(() => {
        const getPagesCount = async () => {
            const response = await fetch('http://localhost:8080/api/v1/books/count',
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
            const pageCount = await response.json();
            if (response.ok) {
                setPageCount(pageCount);
            }
        };
        getPagesCount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addFavorite = async (id) => {
        const requestBody = {
            bookIds: [id],
        };
        const response = await fetch('http://localhost:8080/api/v1/favorites/add',
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody),
            });
        if (response.ok) {
            let result = addedFavs.includes(id) ?
                await deleteFavorite(id, addedFavs) :
                [...addedFavs, id];
            addFav(result);
        }
    }

    const deleteFavorite = async (id, favs) => {
        const response =
            await fetch(`http://localhost:8080/api/v1/favorites?bookId=${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
        if (response.ok) {
            return favs.filter(click => click !== id);
        }
    }

    const move = async (id) => {
        await fetch(`http://localhost:8080/api/v1/views/books/${id}`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
        navigate(`/books/${id}`);
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
                Feautured
            </Typography>

            {
                loading && (
                    <div>
                        <LinearProgress />
                        <br />
                    </div>
                )
            }
            {
                books && books.map((book) => (
                    <Box paddingBottom="2rem">
                        <Box
                            display={isNonMobileScreens ? "flex" : "block"}
                            margin="auto"
                        >
                            <div style={{ textAlign: "center" }}>
                                <img
                                    style={isNonMobileScreens ? {
                                        width: "300px",
                                        height: "463px"
                                    } : {
                                        width: "220px",
                                        height: "340px"
                                    }}
                                    alt={book.name}
                                    src={`data:image/png;base64,${book.images[0]}`}
                                />
                            </div>
                            <Box height="463px"
                                sx={{
                                    ml: "3rem",
                                    display: "flex",
                                    flexDirection: "column"
                                }}
                            >
                                <Typography
                                    fontWeight="bold"
                                    fontSize={isNonMobileScreens ? "32px" : "26px"}
                                    color={main}
                                >
                                    {book.name}
                                </Typography>
                                <Typography
                                    sx={isNonMobileScreens ? {
                                        fontSize: "20px",
                                    } : {
                                        fontSize: "18px",
                                    }}
                                    fontWeight="bold"
                                    color={dark}
                                >
                                    {
                                        isNonMobileScreens ?
                                            book.desc.length > 250 ?
                                                `${book.desc.substring(0, 250)}...` :
                                                book.desc
                                            : book.desc.length > 180 ?
                                                `${book.desc.substring(0, 180)}...` :
                                                book.desc
                                    }
                                </Typography>
                                <Divider />
                                <br />
                                <Typography
                                    component={'span'}
                                    sx={isNonMobileScreens ? {
                                        fontWeight: "bold",
                                        fontSize: "18px",
                                    } : {
                                        fontSize: "16px",
                                    }}
                                    color={dark}
                                >
                                    <Box>
                                        Genres: &nbsp; {getGenres(book)}
                                    </Box>
                                    <br />
                                    <Box>
                                        Published:  &nbsp; {book.publishDate}
                                    </Box>
                                    <Box>
                                        Language:  &nbsp; <Link>{book.language}</Link>
                                    </Box>
                                </Typography>
                                <FlexBetween sx={{ mt: "auto", }}>
                                    <Button
                                        sx={{
                                            width: "10rem",
                                            height: "2.5rem",
                                            fontSize: '1.3rem',
                                            fontStyle: "italic"
                                        }}
                                        variant="contained"
                                        onClick={() => move(book.id)}
                                    >
                                        Read
                                    </Button>
                                    <Button
                                        sx={{
                                            "&:hover": {
                                                cursor: "pointer",
                                            }
                                        }}
                                        onClick={() => addFavorite(book.id)}
                                    >
                                        {
                                            addedFavs.includes(book.id) ?
                                                <BookmarkAddedIcon
                                                    style={{
                                                        width: 40,
                                                        height: 40
                                                    }}
                                                /> :
                                                <BookmarkBorderIcon
                                                    style={{
                                                        width: 40,
                                                        height: 40
                                                    }}
                                                />
                                        }
                                    </Button>
                                </FlexBetween>
                            </Box>
                        </Box>
                    </Box>
                ))
            }
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

export default BooksWidget;