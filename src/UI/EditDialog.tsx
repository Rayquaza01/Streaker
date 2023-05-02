import React, { useEffect, useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { DatetimeLocal } from "./DatetimeLocal";

import Grid from "@mui/material/Grid";

import Collapse from "@mui/material/Collapse";

import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import { Database } from "../Database";
import { useLiveQuery } from "dexie-react-hooks";

export interface EditDialogProps {
    open: boolean
    close(): void
    id: number
}

export function EditDialog(props: EditDialogProps) {
    const [advancedOpen, setAdvancedOpen] = useState(false);
    function toggleAdvancedOpen() {
        setAdvancedOpen(!advancedOpen);
    }

    const [name, setName] = useState("");
    const [currentStreak, setCurrentStreak] = useState(0);
    const [longestStreak, setLongestStreak] = useState(0);
    const [lastUpdated, setLastUpdated] = useState(new Date(0));

    const EditEntry = useLiveQuery(() => Database.streaks.get(props.id), [props.id]);

    useEffect(() => {
        setName(EditEntry?.name ?? "");
        setCurrentStreak(EditEntry?.currentStreak ?? 0);
        setLongestStreak(EditEntry?.longestStreak ?? 0);
        setLastUpdated(new Date(EditEntry?.lastUpdated ?? 0));
    }, [EditEntry]);

    function save() {
        if (name.length === 0 || isNaN(currentStreak) || isNaN(longestStreak)) {
            return;
        }

        Database.streaks.update(props.id, { name, currentStreak, longestStreak, lastUpdated });
        props.close();
    }

    return (
        <Dialog open={props.open}>
            <DialogTitle>Edit "{EditEntry?.name}"</DialogTitle>
            <DialogContent>
                <TextField label="Name" placeholder="Name" value={name} onChange={e => setName(e.target.value)} sx={{ width: "100%", marginTop: 1 }} />

                <Grid container alignItems="center">
                    <Typography variant="subtitle1" flexGrow={1}>Advanced Options</Typography>
                    <IconButton onClick={toggleAdvancedOpen}>
                        {advancedOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                </Grid>

                <Collapse in={advancedOpen} timeout="auto">
                    <Grid container direction="column">
                        <Grid item paddingBottom={2}>
                            <TextField type="number" InputProps={{ inputProps: { min: 0 } }} label="Current Streak" placeholder="Current Streak" value={currentStreak} onChange={e => setCurrentStreak(parseInt(e.target.value))} sx={{ width: "100%" }} />
                        </Grid>
                        <Grid item paddingBottom={2}>
                            <TextField type="number" InputProps={{ inputProps: { min: 0 } }} label="Longest Streak" placeholder="Longest Streak" value={longestStreak} onChange={e => setLongestStreak(parseInt(e.target.value))} sx={{ width: "100%" }} />
                        </Grid>
                        <Grid item>
                            <DatetimeLocal label="Last Updated" value={lastUpdated} onChange={e => setLastUpdated(e)} />
                        </Grid>
                    </Grid>
                </Collapse>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close}>Close</Button>
                <Button onClick={save}>Sumbit</Button>
            </DialogActions>
        </Dialog>
    );
}
