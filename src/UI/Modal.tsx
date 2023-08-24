import React from "react";

export interface ModalProps {
    open: boolean;
    onClick: () => void
    children: React.ReactNode;
}

export function Modal(props: ModalProps) {
    return (
        <div className="modal" data-open={props.open} onClick={props.onClick}>
            {props.children}
        </div>
    );
}
