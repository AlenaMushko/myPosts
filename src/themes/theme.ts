'use client';

import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0b7a1e',
    },
    info: {
      main: '#ffd54f',
    },
    background: {
      default: '#f5f5f5',
      paper: '#fff',
    },
    text: {
      primary: '#03071f',
      secondary: '#ffd54f',
      disabled: '#052a0b',
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#f5f5f5',
          textDecoration: 'none',
          transition: 'border 0.5s ease',
          '&:hover': {
            borderRadius: '8px',
            borderColor: '#f5f5f5',
            border: '1px solid',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          background: ' #056f5d',
          transition: 'background 0.5s ease',
          '&:hover': {
            background: '#f2be12',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#24c039',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        outlined: {
          '&.Mui-focused': {
            color: '#24c039',
          },
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f5f5f5',
    },
    info: {
      main: '#3E90F0',
    },
    background: {
      default: '#0C1A3B',
      paper: '#1B3158',
    },
    text: {
      primary: '#b3e5fc',
      secondary: '#ffd54f',
      disabled: '#79a4eb',
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        outlined: {
          color: '#e0e0e0',
        },
      },
    },
  },
});

export { darkTheme, lightTheme };
