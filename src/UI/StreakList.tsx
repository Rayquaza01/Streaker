import React from "react";

import Grid from "@mui/material/Grid";

import { Database } from "../Database";
import { useLiveQuery } from "dexie-react-hooks";
import { StreakCard } from "./StreakCard";

export function StreakList() {
    const entries = useLiveQuery(() => Database.streaks.toArray());

    return (
        <Grid container spacing={2} justifyContent="center">
            {entries?.map(item => (
                <Grid item flexGrow={1} key={item.id}>
                    <StreakCard entry={item} />
                </Grid>
            ))}
        </Grid>
    );
}
