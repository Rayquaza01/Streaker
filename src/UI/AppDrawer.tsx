import React from "react";

import { Drawer } from "./Drawer";

import { SortingOptions, SortOptions } from "./SortingOptions";
import { ImportExport } from "./ImportExport";

export interface AppDrawerProps {
    open: boolean
    toggleDrawer(): void

    options: SortOptions
    setOptions(opts: SortOptions): void
}

export function AppDrawer(props: AppDrawerProps) {
    return (
        <Drawer open={props.open} onClick={props.toggleDrawer}  >
            <button className="text" onClick={props.toggleDrawer}>Close</button>
            <SortingOptions options={props.options} setOptions={props.setOptions} />
            <ImportExport />
        </Drawer>
    );
}
