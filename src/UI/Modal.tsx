import React from "react";

export interface ModalProps {
    open: boolean
    onClick: () => void
    children: React.ReactNode
    type?: "dialog" | "drawer"
    anchor: "left" | "top"
}

export function Modal(props: ModalProps) {
    function onClick(e: React.MouseEvent) {
        if (e.target === e.currentTarget) {
            props.onClick();
        }
    }

    const classes = "modal modal-" + props.anchor;

    return (
        <div className={classes} data-open={props.open} onClick={onClick} data-type={props.type}>
            {props.children}
        </div>
    );
}
