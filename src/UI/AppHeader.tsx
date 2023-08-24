import React from "react";
import MenuIcon from "../svg/menu.svg";

import IconButton from "@mui/material/IconButton";

export interface AppHeaderProps {
    onMenuClick(): void
}

export function AppHeader(props: AppHeaderProps) {
    return (
        <header>
            <div className="toolbar">
                <button className="icon large" onClick={props.onMenuClick}>
                    <MenuIcon />
                </button>
                <span className="text-title">Streaker</span>
            </div>
        </header>
    );
}
