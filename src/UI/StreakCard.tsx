import React, { useState, useEffect } from "react";

import { MidnightTodayLocal } from "../Dates";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import { StreakEntry } from "../Database";

export interface StreakCardProps {
    entry: StreakEntry
}

export function StreakCard(props: StreakCardProps) {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (props.entry.lastUpdated >= MidnightTodayLocal()) {
            setChecked(true);
        }
    }, [props.entry.lastUpdated]);

    function toggleCheck() {
        setChecked(!checked);
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{props.entry.name}</Typography>
                <Typography variant="body1">Current Streak: {props.entry.currentStreak}</Typography>
                <Typography variant="body1" color="text.secondary">Longest Streak: {props.entry.longestStreak}</Typography>
            </CardContent>
            <CardActions>
                <IconButton onClick={toggleCheck}>
                    { checked ? <CheckCircleIcon /> : <CheckCircleOutlineIcon /> }
                </IconButton>
            </CardActions>
        </Card>
    )
}
