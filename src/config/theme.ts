import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const _theme = createTheme();
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          [_theme.breakpoints.up("lg")]: {
            maxWidth:1300
          },
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        position: "fixed",
        elevation: 0,
      },
      styleOverrides: {
        positionFixed: {
          backgroundColor: "#FFF",
          borderBottom: "1px solid #E0E0E0",
          color: "#000",
        },
      },
    },
  },
});

export default theme;
