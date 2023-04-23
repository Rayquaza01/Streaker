import React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";

export interface AppHeaderProps {
    onMenuClick(): void
}

export function AppHeader(props: AppHeaderProps) {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={props.onMenuClick}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" flexGrow={1}>Streaker</Typography>
            </Toolbar>
        </AppBar>
    )
}
