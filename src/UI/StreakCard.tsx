import React from "react";

import { MidnightTodayLocal } from "../Dates";

import CheckCircleIcon from "../svg/check-circle.svg";
import CheckCircleOutlineIcon from "../svg/check-circle-outline.svg";

import EditIcon from "../svg/pencil.svg";
import DeleteIcon from "../svg/delete.svg";
import ReplayIcon from "../svg/replay.svg";

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
        <div className="card">
            <div className="card-content">
                <span className="text-title">{props.entry.name}</span>
                <span className="text-body">Current Streak: {props.entry.currentStreak}</span>
                <span className="text-body text-secondary">Longest Streak: {props.entry.longestStreak}</span>
            </div>
            <div className="card-actions">
                <div className="flex-row grow">
                    <button className="icon" onClick={updateStreak}>
                        {checked ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
                    </button>
                    <button className="icon" onClick={resetStreak}>
                        <ReplayIcon />
                    </button>
                </div>
                <div className="flex-row">
                    <button className="icon" onClick={openEditDialog}>
                        <EditIcon />
                    </button>
                    <button className="icon" onClick={deleteEntry}>
                        <DeleteIcon />
                    </button>
                </div>
            </div>
        </div>
    );
}
