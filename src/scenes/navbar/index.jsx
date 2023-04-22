import { useState } from "react";
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery
} from "@mui/material";
import {
    Search,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close
} from "@mui/icons-material";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import AutoStoriesTwoToneIcon from '@mui/icons-material/AutoStoriesTwoTone';

const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.userData);
    const token = useSelector((state) => state.token);
    const refreshToken = useSelector((state) => state.refreshToken);
    // Hook from mui that allows to determine
    // if the current screen size is below the min-width
    // or higher than min-width
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;

    const username = user.username;

    const logout = async () => {
        const requestBody = {
            username: username,
            refreshToken: refreshToken
        }
        const logoutResponse = await fetch(
            "http://localhost:8080/api/v1/auth/logout",
            {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(requestBody),
            }
        );
        if(logoutResponse) {
            dispatch(setLogout());
        }
    }

    return <FlexBetween padding="1rem 6%">
        <FlexBetween gap="1.75 rem">
            <Typography
                fontWeight="bold"
                fontSize="clamp(1rem, 2rem, 2.25rem)" // clamp takes min, preffered and max values of the font
                color="primary"
                onClick={() => navigate("/home")}
                sx={{ // additional css properties
                    "&:hover": {
                        color: primaryLight,
                        cursor: "pointer",
                    },
                }}
            >
                Books <AutoStoriesTwoToneIcon /> <span style={{ color: dark }}>Lit</span>
            </Typography>
            {
                isNonMobileScreens && (
                    <FlexBetween backgroundColor={neutralLight}
                        borderRadius="9px"
                        gap="3rem"
                        padding="0.1rem 1.5rem"
                        marginLeft="10px"
                    >
                        <InputBase placeholder="Search..." sx={{ fontStyle: "italic" }} />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                )
            }
        </FlexBetween>

        {/* DESKTOP NAV*/}
        {isNonMobileScreens ? (
            <FlexBetween gap="2rem">
                <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === "dark" ? (
                        <DarkMode sx={{ fontSize: "25px" }} />
                    ) : (
                        <LightMode sx={{ color: dark, fontSize: "25px" }} />
                    )}
                </IconButton>
                <BookmarkIcon sx={{ fontSize: "25px" }} />
                <Notifications sx={{ fontSize: "25px" }} />
                <Help sx={{ fontSize: "25px" }} />
                <FormControl variant="standard" value={username}>
                    <Select
                        value={username}
                        sx={{
                            backgroundColor: neutralLight,
                            width: "150px",
                            borderRadius: "0.25rem",
                            p: "0.25rem 1rem", // top-bottom, left-right
                            "& .MuiSvgIcon-root": {
                                pr: "0.25rem",
                                width: "3rem"
                            },
                            "& .MuiSelect-select:focus": {
                                backgroundColor: neutralLight
                            }
                        }}
                        input={<InputBase />}
                    >
                        <MenuItem value={username}>
                            <Typography>{username}</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => logout()}>
                            Log out
                        </MenuItem>
                    </Select>
                </FormControl>
            </FlexBetween>
        ) : (
            <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
                <Menu />
            </IconButton>
        )}

        {/* MOBILE NAV */}
        {!isNonMobileScreens && isMobileMenuToggled && (
            <Box
                position="fixed"
                right="0"
                bottom="0"
                height="100%"
                zIndex="10" // in front of everything
                maxWidth="500px"
                minWidth="300px"
                backgroundColor={background}
            >
                {/* CLOSE ICON */}
                <Box display="flex" justifyContent="flex-end" p="1rem">
                    <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                        <Close />
                    </IconButton>
                </Box>

                {/* MENU ITEMS */}
                <FlexBetween
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    gap="3rem"
                >
                    <IconButton
                        onClick={() => dispatch(setMode())}
                        sx={{ fontSize: "25px" }}
                    >
                        {theme.palette.mode === "dark" ? (
                            <DarkMode sx={{ fontSize: "25px" }} />
                        ) : (
                            <LightMode sx={{ color: dark, fontSize: "25px" }} />
                        )}
                    </IconButton>
                    <BookmarkIcon sx={{ fontSize: "25px" }} />
                    <Notifications sx={{ fontSize: "25px" }} />
                    <Help sx={{ fontSize: "25px" }} />
                    <FormControl variant="standard" value={username}>
                        <Select
                            value={username}
                            sx={{
                                backgroundColor: neutralLight,
                                width: "150px",
                                borderRadius: "0.25rem",
                                p: "0.25rem 1rem", // top-bottom, left-right
                                "& .MuiSvgIcon-root": {
                                    pr: "0.25rem",
                                    width: "3rem"
                                },
                                "& .MuiSelect-select:focus": {
                                    backgroundColor: neutralLight
                                }
                            }}
                            input={<InputBase />}
                        >
                            <MenuItem value={username}>
                                <Typography>{username}</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => logout()}>
                                Log out
                            </MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>
            </Box>
        )}
    </FlexBetween>
}

export default Navbar;