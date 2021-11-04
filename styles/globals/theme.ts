import {createTheme, responsiveFontSizes} from '@mui/material/styles';
import {lightGreen, blueGrey} from '@mui/material/colors';

// Create a theme instance.
let theme = createTheme({
  palette: {
    primary: lightGreen,
    secondary: blueGrey,
  },
  typography: {
    fontFamily: ['Alice'].join(','),
  },
});

theme = responsiveFontSizes(theme);

export default theme;
