import React from "react";

import { Database } from "../Database";
import { useLiveQuery } from "dexie-react-hooks";
import { StreakCard } from "./StreakCard";
import { SortOptions, SortOrders } from "./SortingOptions";

export interface StreakListProps {
    openEditDialog(id: number): void
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
        <div className="card-list">
            {entries?.map(item => (
                <div className="grow" key={item.id}>
                    <StreakCard entry={item} openEditDialog={props.openEditDialog} />
                </div>
            ))}
        </div>
    );
}
