import React from "react";
import MenuIcon from "../svg/menu.svg";

export interface AppHeaderProps {
    onMenuClick(): void
}

export function AppHeader(props: AppHeaderProps) {
    return (
        <header>
            <div className="toolbar">
                <button className="icon" onClick={props.onMenuClick}>
                    <MenuIcon />
                </button>
                <span className="text-title">Streaker</span>
            </div>
        </header>
    );
}
