import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Container from "@mui/material/Container";

import React, { useState, useMemo, useEffect } from "react";

import { AppHeader } from "./UI/AppHeader";
import { RequestPersistance } from "./UI/RequestPersistance";
import { StreakList } from "./UI/StreakList";
import { AddEntry } from "./UI/AddEntry";
import { AppDrawer } from "./UI/AppDrawer";
import { EditDialog } from "./UI/EditDialog";

import { isSortOptions, SortOptions, SortOrders } from "./UI/SortingOptions";

const defaultSort: SortOptions = { order: SortOrders.NAME, ascending: true };

export function App() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    function toggleDrawer() {
        setDrawerOpen(!drawerOpen);
    }

    const [editOpen, setEditOpen] = useState(false);
    const [editID, setEditID] = useState(-1);

    function openEditDialog(id: number) {
        setEditID(id);
        setEditOpen(true);
    }

    function closeEditDialog() {
        setEditOpen(false);
    }

    const [sort, setSort] = useState<SortOptions>();
    // initialize sort if possible
    useEffect(() => {
        const sort = localStorage.getItem("sort");
        if (sort === null) {
            setSort(defaultSort);
        } else {
            try {
                const parsed = JSON.parse(sort);
                if (isSortOptions(parsed)) {
                    setSort(parsed);
                } else {
                    setSort(defaultSort);
                }
            } catch {
                return setSort(defaultSort);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("sort", JSON.stringify(sort));
    }, [sort]);

    // https://mui.com/material-ui/customization/dark-mode/
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const theme = useMemo(() =>
        createTheme({ palette: { mode: prefersDarkMode ? "dark" : "light" } }),
    [prefersDarkMode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppHeader onMenuClick={toggleDrawer} />
            <Container sx={{ mt: 2 }}>
                <AppDrawer open={drawerOpen} toggleDrawer={toggleDrawer} options={sort ?? defaultSort} setOptions={setSort} />
                <RequestPersistance />
                <AddEntry />
                <StreakList openEditDialog={openEditDialog} sortOptions={sort ?? defaultSort} />
                <EditDialog open={editOpen} id={editID} close={closeEditDialog} />
            </Container>
        </ThemeProvider>
    );
}
