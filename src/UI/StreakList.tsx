import React from "react";

import Grid from "@mui/material/Grid";

import { Database } from "../Database";
import { useLiveQuery } from "dexie-react-hooks";
import { StreakCard } from "./StreakCard";
import { SortOptions, SortOrders } from "./SortingOptions";

export interface StreakListProps {
    openEditDialog(id: number, name: string): void
    sortOptions: SortOptions
}

export function StreakList(props: StreakListProps) {
    const entries = useLiveQuery(() => {
        let orderBy = "";
        switch (props.sortOptions.order) {
            case SortOrders.NAME:
                orderBy = "name";
                break;
            case SortOrders.CREATED:
                orderBy = "id";
                break;
        }

        const query = Database.streaks.orderBy(orderBy);
        if (!props.sortOptions.ascending) {
            return query.reverse().toArray();
        }
        return query.toArray();
    }, [props.sortOptions]);

    return (
        <Grid container spacing={2} justifyContent="center">
            {entries?.map(item => (
                <Grid item flexGrow={1} key={item.id}>
                    <StreakCard entry={item} openEditDialog={props.openEditDialog} />
                </Grid>
            ))}
        </Grid>
    );
}
