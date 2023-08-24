import React from "react";
import { Modal } from "./Modal";

export interface DialogOptions {
    open: boolean
    onClick: () => void
    children: React.ReactNode
}

export function Dialog(props: DialogOptions) {
    return (
        <Modal open={props.open} onClick={props.onClick} type="dialog" anchor="top">
            <div className="card">
                { props.children }
            </div>
        </Modal>
    );
}
