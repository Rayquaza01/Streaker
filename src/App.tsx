import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Container from "@mui/material/Container";

import React, { useState, useMemo } from "react";

import { AppHeader } from "./UI/AppHeader";
import { RequestPersistance } from "./UI/RequestPersistance";
import { StreakList } from "./UI/StreakList";

export function App() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    function toggleDrawer() {
        setDrawerOpen(!drawerOpen);
    }

    // https://mui.com/material-ui/customization/dark-mode/
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const theme = useMemo(() =>
        createTheme({ palette: { mode: prefersDarkMode ? "dark" : "light" } }),
    [prefersDarkMode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppHeader onMenuClick={toggleDrawer} />
            <Container>
                <RequestPersistance />
                <StreakList />
            </Container>
        </ThemeProvider>
    );
}
