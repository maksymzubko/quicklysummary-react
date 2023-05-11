import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const defaultTheme = createTheme({
    typography: {
        fontFamily: 'Nunito Sans, sans-serif',
    },
    palette:{
        primary: {main: "#1A191D"}
    }
});

export default defaultTheme;