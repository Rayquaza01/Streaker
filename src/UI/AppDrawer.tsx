import React, { useState } from "react";

import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

import { SortingOptions, SortOptions } from "./SortingOptions";

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const drawerWidth = isMobile ? "60vw" : "500px";

export interface AppDrawerProps {
    open: boolean
    toggleDrawer(): void

    options: SortOptions
    setOptions(opts: SortOptions): void
}

export function AppDrawer(props: AppDrawerProps) {
    return (
        <Drawer open={props.open} anchor="left" sx={{ width: drawerWidth, flexShrink: 0, "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" } }} ModalProps={{ onBackdropClick: props.toggleDrawer }}>
            <Button onClick={props.toggleDrawer}>Close</Button>
            <SortingOptions options={props.options} setOptions={props.setOptions} />
        </Drawer>
    )
}
