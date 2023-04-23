import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { Database } from "../Database";
import { useLiveQuery } from "dexie-react-hooks";
import { StreakCard } from "./StreakCard";

export function StreakList() {
    const entries = useLiveQuery(() => Database.streaks.toArray());

    return (
        // <List component="div">
        //     {entries?.map(item => (
        //         <ListItem key={item.id}>
        //             <StreakCard entry={item} />
        //         </ListItem>
        //     ))}
        // </List>
        <Grid container spacing={2} justifyContent="center">
            {entries?.map(item => (
                <Grid item flexGrow={1} key={item.id}>
                    <StreakCard entry={item} />
                </Grid>
            ))}
        </Grid>
    );
}
