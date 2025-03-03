import { createTheme } from "@mui/material";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
  palette: {
    primary: {
      main: "#1565c0",
    },
    background: {
      default: "#faf9f6",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1920,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        scrollBehavior: "smooth",
      },
    },
  },
});

export default theme;
