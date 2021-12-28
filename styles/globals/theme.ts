import {createTheme, responsiveFontSizes} from '@mui/material/styles';

// Create a theme instance.
let theme = createTheme({
  palette: {
    background: {
      default: '#fafffa',
    },
    primary: {
      light: '#8bbbe7',
      main: '#5e97ba',
      dark: '#275e85',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fcffe8',
      main: '#c9d8b6',
      dark: '#98a786',
      contrastText: '#000',
    },
    error: {
      main: '#ff604f',
    },
  },
  typography: {
    h2: {
      fontStyle: 'italic',
      fontFamily: 'Alice',
    },
    h3: {
      fontStyle: 'bold',
      fontFamily: 'Alice',
    },
    fontFamily: [
      'Cormorant',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

theme = responsiveFontSizes(theme);

export default theme;
