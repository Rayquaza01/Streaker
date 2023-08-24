import React from "react";

export interface ModalProps {
    open: boolean
    onClick: () => void
    children: React.ReactNode
    type?: "dialog" | "drawer"
}

export function Modal(props: ModalProps) {
    function onClick(e: React.MouseEvent) {
        if (e.target === e.currentTarget) {
            props.onClick();
        }
    }

    return (
        <div className="modal" data-open={props.open} onClick={onClick} data-type={props.type}>
            {props.children}
        </div>
    );
}
