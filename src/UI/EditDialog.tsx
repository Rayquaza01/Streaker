import React, { useEffect, useState } from "react";

import { Dialog } from "./Dialog";
import { DatetimeLocal } from "./DatetimeLocal";

import { Database } from "../Database";
import { useLiveQuery } from "dexie-react-hooks";

export interface EditDialogProps {
    open: boolean
    close(): void
    id: number
}

export function EditDialog(props: EditDialogProps) {
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
        <Dialog open={props.open} onClick={props.close}>
            <div className="card-content">
                <span className="text-title">Edit "{EditEntry?.name}"</span>
                <fieldset>
                    <legend>Name</legend>
                    <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value )} />
                </fieldset>

                <details>
                    <summary>Advanced Options</summary>
                    <div className="flex-column">
                        <fieldset>
                            <legend>Current Streak</legend>
                            <input type="number" min="0" placeholder="Current Streak" value={currentStreak} onChange={e => setCurrentStreak(parseInt(e.target.value))} />
                        </fieldset>
                        <fieldset>
                            <legend>Longest Streak</legend>
                            <input type="number" min="0" placeholder="Longest Streak" value={longestStreak} onChange={e => setLongestStreak(parseInt(e.target.value))} />
                        </fieldset>
                        <fieldset>
                            <legend>Last Updated</legend>
                            <DatetimeLocal value={lastUpdated} onChange={e => setLastUpdated(e)} />
                        </fieldset>
                    </div>
                </details>
            </div>
            <div className="card-actions">
                <button className="text" onClick={props.close}>Close</button>
                <button className="text" onClick={save}>Sumbit</button>
            </div>
        </Dialog>
    );
}
