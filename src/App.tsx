import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Container from "@mui/material/Container";

import React, { useState, useMemo } from "react";

import { AppHeader } from "./UI/AppHeader";
import { RequestPersistance } from "./UI/RequestPersistance";
import { StreakList } from "./UI/StreakList";
import { AddEntry } from "./UI/AddEntry";

export function App() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    function toggleDrawer() {
        setDrawerOpen(!drawerOpen);
    }

    const [editOpen, setEditOpen] = useState(false);
    const [editID, setEditID] = useState(-1);
    const [editName, setEditName] = useState("");

    function toggleEditDialog(id: number, name: string) {
        setEditID(id);
        setEditName(name);
        setEditOpen(!editOpen);
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
                <AddEntry />
                <StreakList openEditDialog={toggleEditDialog} />
            </Container>
        </ThemeProvider>
    );
}
