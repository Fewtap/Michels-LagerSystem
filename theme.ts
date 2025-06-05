import { createTheme } from "@mui/material/styles";
import { deepPurple, grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4B2067', // dark muted purple
      light: '#7F3FBF',
      dark: '#2B133A',
      contrastText: '#F4F0F8',
    },
    secondary: {
      main: '#9E8FB2', // muted lavender
      light: '#CFC3DD',
      dark: '#6C5A7B',
      contrastText: '#fff',
    },
    background: {
      default: '#F6F5FA', // soft muted background
      paper: '#ECE8F1',
    },
    text: {
      primary: '#2B133A',
      secondary: '#6C5A7B',
      disabled: grey[500],
    },
    divider: '#E0D7EC',
    
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: [
      'Inter',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ].join(','),
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#ECE8F1',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#4B2067',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;
