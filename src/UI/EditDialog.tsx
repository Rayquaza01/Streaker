import React, { useState, useEffect } from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { Database } from "../Database";
import { useLiveQuery } from "dexie-react-hooks";

export interface EditDialogProps {
    open: boolean
    close(): void
    id: number
}

export function EditDialog(props: EditDialogProps) {
    const EditEntry = useLiveQuery(() => Database.streaks.get(props.id), [props.id]);

    const [name, setName] = useState("");
    useEffect(() => {
        setName(EditEntry?.name ?? "");
    }, [EditEntry]);

    function save() {
        if (name.length === 0) {
            return;
        }

        Database.streaks.update(props.id, { name });
        props.close();
    }

    return (
        <Dialog open={props.open}>
            <DialogTitle>Edit "{EditEntry?.name}"</DialogTitle>
            <DialogContent>
                <TextField variant="standard" placeholder="New Name" value={name} onChange={e => setName(e.target.value)} sx={{ width: "100%" }} />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close}>Close</Button>
                <Button onClick={save}>Sumbit</Button>
            </DialogActions>
        </Dialog>
    );
}
