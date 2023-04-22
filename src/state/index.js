import { createSlice } from "@reduxjs/toolkit";

// Global state (accesible throughout entire app)
const initialState = {
    mode: "light",
    userData: {
        username: "Init U",
        userId: null
    },
    loading: false,
    token: null,
    expiresAt: null,
    role: null,
    refreshToken: null,
    error: {
        status: null,
        message: null
    },
    favorites: [],
    books: [],
    authors: [],
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.userData = action.payload.userData;
            state.token = action.payload.token;
            state.expiresAt = action.payload.expiresAt;
            state.role = action.payload.role;
            state.refreshToken = action.payload.refreshToken;
        },
        setLogout: (state) => {
            state.userData = null;
            state.token = null;
            state.expiresAt = null;
            state.role = null;
            state.refreshToken = null;
            state.books = null;
            state.authors = null;
            state.loading = false;
        },
        setLoading: (state) => {
            state.loading = true;
        },
        setError: (state, action) => {
            console.log(action); // what's wrong
            state.loading = false;
            state.error = action.payload.error;
        },
        clearError: (state) => {
            state.error = null;
        },
        setFavorites: (state, action) => {
            if (state.userData) {
                state.userData.favorites = action.payload.favorites;
            } else {
                console.log("No favs: " + action.payload.favorites);
            }
        },
        setBooks: (state, action) => {
            console.log(action)
            state.loading = false;
            state.books = action.payload.books;
        },
        setAuthors: (state, action) => {
            state.authors = action.payload.authors;
        },
        setBook: (state, action) => {
            const updatedBooks = state.books.map((book) => {
                if (book._id === action.payload.book_id) return action.payload.book;
                return book;
            })
            state.books = updatedBooks;
        },
        setAuthor: (state, action) => {
            const updatedAuthors = state.books.map((author) => {
                if (author._id === action.payload.author_id) return action.payload.author;
                return author;
            })
            state.authors = updatedAuthors;
        }
    }
})

export const {
    setMode,
    setLogin,
    setLogout,
    setError,
    setLoading,
    clearError,
    setFavorites,
    setBooks,
    setAuthors,
    setBook,
    setAuthor
} = authSlice.actions;

export default authSlice.reducer;