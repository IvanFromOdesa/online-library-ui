import { Box, Button, Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
import ImageSlider from "components/ImageSlider";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import { beautifyText } from "textFormatting";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DoneIcon from '@mui/icons-material/Done';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import BooksLit from "scenes/widgets/BooksLit";

const BookPage = () => {
    const [book, setBook] = useState(null);
    const [views, setViews] = useState(0);
    const [favorite, setFavorite] = useState(false);
    const { bookId } = useParams();
    const { palette } = useTheme();

    const id_user = useSelector((state) => state.userData.userId);
    const token = useSelector((state) => state.token);

    const isNonMobileScreens = useMediaQuery("(min-width:1600px)");

    const dark = palette.neutral.dark;
    const main = palette.primary.main;

    function getGenres(book) {
        let genres = book.genres;
        genres = beautifyText(genres);
        return genres.join(', ');
    }

    useEffect(() => {
        const getBookById = async () => {
            const response = await fetch(`http://localhost:8080/api/v1/books/byId/${bookId}`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
            const data = await response.json();
            if (response.ok) {
                setFavorite(data.favorite);
                setBook(data);
            }
        };
        getBookById();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const getBookViews = async () => {
            const response = await fetch(`http://localhost:8080/api/v1/views/books/${bookId}`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
            const data = await response.json();
            if (response.ok) {
                setViews(data);
            }
        }
        getBookViews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addFavorite = async (id) => {
        const requestBody = {
            bookIds: [id],
            idUser: id_user
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
            setFavorite(true);
        }
    }

    const deleteFavorite = async (id) => {
        const response =
            await fetch(`http://localhost:8080/api/v1/favorites?userId=${id_user}&bookId=${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
        if (response.ok) {
            setFavorite(false);
        }
    }

    return (
        <Box>
            <Navbar />
            {
                book && <Box
                    width="100%"
                    padding="2rem 6%"
                >
                    <Box
                        display="flex"
                        margin="auto"
                    >
                        {/* IMAGE SIZE CONTAINER */}
                        <div style={isNonMobileScreens ? {
                            width: "300px",
                            height: "463px"
                        } : {
                            width: "220px",
                            height: "340px"
                        }}>
                            <ImageSlider slides={book.images} />
                        </div>
                        {/* TEXT INFO */}
                        <Box height="100%"
                            sx={{
                                width: "50%",
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
                                {book.desc}
                            </Typography>
                            <Divider />
                            <br />
                            <Typography
                                component={'span'}
                                sx={isNonMobileScreens ? {
                                    fontWeight: "bold",
                                    fontSize: "20px",
                                } : {
                                    fontWeight: "bold",
                                    fontSize: "18px",
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
                                <br />
                                <Box>
                                    Authors: &nbsp; <Link>{book.authors}</Link>
                                </Box>
                                <br />
                                <Box>
                                    Views: &nbsp; {views} <VisibilityIcon
                                        sx={{
                                            pt: "5px"
                                        }}
                                    />
                                </Box>
                            </Typography>
                            <br />
                            {
                                favorite ?
                                    <Button
                                        variant="outlined"
                                        endIcon={<DoneIcon />}
                                        onClick={() => deleteFavorite(book.id)}
                                    >
                                        Added to favorites
                                    </Button> :
                                    <Button
                                        variant="contained"
                                        endIcon={<AddIcon />}
                                        onClick={() => addFavorite(book.id)}
                                    >
                                        Add to favorites
                                    </Button>
                            }
                            <br />
                            <br />
                            {/* DOWNLOADS */}
                            <Box>
                                <div>
                                    <Divider
                                        sx={{
                                            "&::before, &::after": {
                                                borderColor: main,
                                            },
                                        }}
                                    >
                                        <Typography
                                            sx={isNonMobileScreens ? {
                                                fontWeight: "bold",
                                                fontSize: "20px",
                                            } : {
                                                fontWeight: "bold",
                                                fontSize: "18px",
                                            }}
                                            color={dark}
                                        >
                                            Download
                                        </Typography>
                                    </Divider>
                                </div>
                                <br />
                                <div style={{
                                    textAlign: "center",
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                }}>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        endIcon={<DownloadIcon />}
                                    >
                                        Download PDF
                                    </Button>
                                    <Divider orientation="vertical" flexItem />
                                    <Button
                                        variant="contained"
                                        component="label"
                                        endIcon={<DownloadIcon />}
                                    >
                                        Download TXT
                                    </Button>
                                    <Divider orientation="vertical" flexItem />
                                    <Button
                                        variant="contained"
                                        component="label"
                                        endIcon={<DownloadIcon />}
                                    >
                                        Download EPB
                                    </Button>
                                </div>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            }
            {/* TODO: make separate jsx for suggestions */}
            <Box
                width="100%"
                padding="4rem 6%"
            >
                <Typography
                    fontWeight="bold"
                    fontSize={isNonMobileScreens ? "32px" : "26px"}
                    color={dark}
                >
                    You might also want to read
                </Typography>
            </Box>
            <BooksLit />
        </Box>
    )
}

export default BookPage;