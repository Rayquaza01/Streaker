import React, { Children } from "react";
import { Modal } from "./Modal";

export interface DrawerProps {
    open: boolean
    onClick: () => void;
    children: React.ReactNode;
}

export function Drawer(props: DrawerProps) {
    return (
        <Modal open={props.open} onClick={props.onClick}>
            <div className="drawer">
                { props.children }
            </div>
        </Modal>
    )
}
