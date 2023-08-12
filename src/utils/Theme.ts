import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2",
            light: "#63a4ff",
            dark: "#004ba0",
            contrastText: "#fff"
        },
        secondary: {
            main: "#dc004e",
            light: "#ff5983",
            dark: "#9a0036",
            contrastText: "#fff"
        },
        error: {
            main: "#d32f2f",
            light: "#ff6659",
            dark: "#9a0007",
            contrastText: "#fff"
        },
        warning: {
            main: "#ffa000",
            light: "#ffd149",
            dark: "#c67100",
            contrastText: "#fff"
        },
        info: {
            main: "#1976d2",
            light: "#63a4ff",
            dark: "#004ba0",
            contrastText: "#fff"
        },
        success: {
            main: "#388e3c",
            light: "#6abf69",
            dark: "#00600f",
            contrastText: "#fff"
        },
        text: {
            primary: "#000",
            secondary: "#fff",
            disabled: "#fff",
        },
        background: {
            paper: "#fff",
            default: "#fff"
        },
        common: {
            black: "#000",
            white: "#fff"
        },
    }
});


