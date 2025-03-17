import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    cssVariables: true,
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
        // text: {}
    },

    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                input: {
                    "&:-webkit-autofill": {
                        WebkitBoxShadow: "0 0 0 100px rgb(185, 240, 255) inset",
                        WebkitTextFillColor: "#000000",
                        caretColor: "#fff",
                    },
                    "&:-webkit-autofill:focus": {
                        WebkitBoxShadow: "0 0 0 100px rgb(185, 240, 255)  inset",
                        WebkitTextFillColor: "#000000",
                    },
                    "&:-webkit-autofill:hover": {
                        WebkitBoxShadow: "0 0 0 100px rgb(185, 240, 255)  inset",
                        WebkitTextFillColor: "#000000",
                    },
                    "&::selection": {
                        backgroundColor: "#rgb(249, 249, 249)",
                        color: "#000000",
                    },
                },
            },
        },
    },
});

export default theme;