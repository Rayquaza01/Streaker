import React from "react";

import Drawer from "@mui/material/Drawer";

import { isMobile } from "../isMobile";

import { SortingOptions, SortOptions } from "./SortingOptions";
import { ImportExport } from "./ImportExport";

const drawerWidth = isMobile ? "60vw" : "500px";

export interface AppDrawerProps {
    open: boolean
    toggleDrawer(): void

    options: SortOptions
    setOptions(opts: SortOptions): void
}

export function AppDrawer(props: AppDrawerProps) {
    return (
        <Drawer keepMounted={true} open={props.open} anchor="left" sx={{ width: drawerWidth, flexShrink: 0, "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" } }} ModalProps={{ onBackdropClick: props.toggleDrawer }} >
            <button className="text" onClick={props.toggleDrawer}>Close</button>
            <SortingOptions options={props.options} setOptions={props.setOptions} />
            <ImportExport />
        </Drawer>
    );
}
