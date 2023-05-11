import React from "react";

import { MidnightTodayLocal } from "../Dates";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import IconButton from "@mui/material/IconButton";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplayIcon from "@mui/icons-material/Replay";

import { Database, StreakEntry, UpdateActions } from "../Database";

export interface StreakCardProps {
    entry: StreakEntry
    openEditDialog(id: number): void
}

export function StreakCard(props: StreakCardProps) {
    // if was checked at some point today, prevent further checking
    const checked = props.entry.lastUpdated >= MidnightTodayLocal();

    function updateStreak() {
        Database.update(props.entry.id, checked ? UpdateActions.DECREMENT : UpdateActions.INCREMENT);
    }

    function resetStreak() {
        Database.update(props.entry.id, UpdateActions.RESET);
    }

    function openEditDialog() {
        props.openEditDialog(props.entry.id);
    }

    function deleteEntry() {
        Database.deleteEntry(props.entry.id);
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{props.entry.name}</Typography>
                <Typography variant="body1">Current Streak: {props.entry.currentStreak}</Typography>
                <Typography variant="body2" color="text.secondary">Longest Streak: {props.entry.longestStreak}</Typography>
            </CardContent>
            <CardActions>
                <Grid container>
                    <Grid item flexGrow={1}>
                        <IconButton onClick={updateStreak}>
                            {checked ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
                        </IconButton>
                        <IconButton onClick={resetStreak}>
                            <ReplayIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={openEditDialog}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={deleteEntry}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
}
