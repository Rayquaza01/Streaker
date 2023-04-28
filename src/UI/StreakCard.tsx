import React, { useState, useEffect } from "react";

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

import { Database, StreakEntry } from "../Database";

export interface StreakCardProps {
    entry: StreakEntry
    openEditDialog(id: number): void
}

export function StreakCard(props: StreakCardProps) {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        // if was checked at some point today, prevent further checking
        if (props.entry.lastUpdated >= MidnightTodayLocal()) {
            setChecked(true);
        }
    }, [props.entry.lastUpdated]);

    function updateStreak() {
        if (checked) return;

        Database.update(props.entry.id, props.entry.currentStreak, props.entry.longestStreak);
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
                    </Grid>
                    <Grid item>
                        <IconButton onClick={openEditDialog}>
                            <EditIcon color="disabled" />
                        </IconButton>
                        <IconButton onClick={deleteEntry}>
                            <DeleteIcon color="disabled" />
                        </IconButton>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
}
