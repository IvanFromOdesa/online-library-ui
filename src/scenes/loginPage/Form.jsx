import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, setError, setLogin } from 'state';

// determines the shape of how the form library is gonna be saving the info
const registerSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("Email required"),
    username: yup.string().required("Username required"),
    password: yup.string().required("Password required"),
})

const loginScema = yup.object().shape({
    username: yup.string().required("Username required"),
    password: yup.string().required("Password required"),
})

const initialValuesReqister = {
    email: "",
    username: "",
    password: "",
}

const initialValuesLogin = {
    username: "",
    password: "",
}

const Form = () => {
    const [pageType, setPageType] = useState("login");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width:600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";
    const [isRegisteredSuccess, setRegisterSuccess] = useState(false);
    const error = useSelector((state) => state.error);

    const register = async (values, onSubmitProps) => {
        const savedUserResponse = await fetch(
            "http://localhost:8080/api/v1/auth/signup",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            }
        );

        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if (savedUser) {
            dispatch(clearError());
            setPageType("login");
            setRegisterSuccess(true);
        }
    };

    const login = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch(
            "http://localhost:8080/api/v1/auth/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            }
        );

        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();

        if (loggedInResponse.ok) {
            dispatch(
                setLogin({
                    userData: {
                        username: loggedIn.username,
                        userId: loggedIn.userId
                    },
                    token: loggedIn.authenticationToken,
                    expiresAt: loggedIn.expiresAt,
                    role: loggedIn.role,
                    refreshToken: loggedIn.refreshToken,
                })
            );
            dispatch(clearError());
            navigate("/home");
        } else {
            dispatch(setError({
                error: {
                    status: loggedIn.status,
                    message: loggedIn.message,
                }
            }))
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };

    return (
        <div>
            <Typography
                fontWeight="500"
                variant="h5"
                textAlign="center"
                sx={{
                    mb: "1.5rem" // margin bottom
                }}
            >
                {isRegisteredSuccess
                    ? "Thanks for registering on BooksLit. Check your email."
                    : ""}
                <span style={{ color: "red" }}>{error && error.message}</span>
            </Typography>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={isLogin ? initialValuesLogin : initialValuesReqister}
                validationSchema={isLogin ? loginScema : registerSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    resetForm
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobileScreens ? undefined : "span 4" },
                            }}
                        >
                            {isRegister && (
                                <>
                                    <TextField
                                        label="Email"
                                        onBlur={handleBlur} // click out of input
                                        onChange={handleChange}
                                        value={values.email}
                                        name="email"
                                        error={Boolean(touched.email) && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                        sx={{ gridColumn: "span 2" }}
                                    />
                                </>
                            )}
                            <TextField
                                label="Username"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.username}
                                name="username"
                                error={Boolean(touched.username) && Boolean(errors.username)}
                                helperText={touched.username && errors.username}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                error={Boolean(touched.password) && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                                sx={{ gridColumn: "span 2" }}
                            />
                        </Box>

                        {/* BUTTONS */}
                        <Box>
                            <Button
                                fullWidth
                                type="submit"
                                sx={{
                                    m: "2rem 0",
                                    p: "1rem",
                                    backgroundColor: palette.primary.main,
                                    color: palette.neutral.dark,
                                    fontSize: "16px",
                                    "&:hover": { color: palette.primary.main },
                                }}
                                endIcon={isLogin ? <ArrowForwardIcon /> : <></>}
                            >
                                {isLogin ? "LOG IN" : "REGISTER"}
                            </Button>
                            <Typography
                                onClick={() => {
                                    dispatch(clearError());
                                    setPageType(isLogin ? "register" : "login");
                                    setRegisterSuccess(false);
                                    resetForm();
                                }}
                                textAlign="center"
                                sx={{
                                    textDecoration: "underline",
                                    color: palette.primary.main,
                                    "&:hover": {
                                        cursor: "pointer",
                                        color: palette.primary.light,
                                    },
                                }}
                            >
                                {isLogin
                                    ? "Don't have an account? Sign up."
                                    : "Already have an account? Login."}
                            </Typography>
                        </Box>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default Form;