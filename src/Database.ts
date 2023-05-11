import Dexie from "dexie";
import { MidnightYesterdayLocal, MidnightTodayLocal } from "./Dates";

export enum UpdateActions {
    INCREMENT,
    DECREMENT,
    RESET
}

export interface StreakEntry {
    /** The id for the current entry */
    id: number
    /** The name of the streak */
    name: string
    /** The longest this streak went for */
    longestStreak: number
    /** The current length of the streak */
    currentStreak: number
    /** The date the streak was last updated */
    lastUpdated: Date
}

export function isStreakEntry(e?: Record<string, any>): e is StreakEntry {
    if (!e) return false;

    return typeof e.id === "number" &&
        typeof e.name === "string" &&
        typeof e.longestStreak === "number" &&
        typeof e.currentStreak === "number" &&
        typeof e.lastUpdated === "string";
}

class StreakDatabase extends Dexie {
    streaks!: Dexie.Table<StreakEntry, number>;

    constructor() {
        super("StreakDatabase");
        this.version(3).stores({
            streaks: "++id, name, lastUpdated"
        });

        this.clearStreaks();
    }

    clearStreaks() {
        // if streak was not updated yesterday, reset the streak
        this.streaks.where("lastUpdated").below(MidnightYesterdayLocal()).toArray().then(toClear => {
            toClear.forEach(item => {
                this.update(item.id, UpdateActions.RESET);
            });
        });
    }

    async update(id: number, action: UpdateActions) {
        const streak = await this.streaks.get(id);
        if (!streak) return;

        const lastUpdated = new Date();

        switch (action) {
            case UpdateActions.RESET:
                streak.currentStreak = 0;

                if (streak.lastUpdated >= MidnightTodayLocal()) {
                    streak.lastUpdated.setDate(streak.lastUpdated.getDate() - 1);
                }
                break;

            case UpdateActions.INCREMENT:
                streak.currentStreak++;
                if (streak.currentStreak > streak.longestStreak) {
                    streak.longestStreak = streak.currentStreak;
                }
                streak.lastUpdated = lastUpdated;
                break;

            case UpdateActions.DECREMENT:
                streak.currentStreak--;
                if (streak.currentStreak < 0) {
                    streak.currentStreak = 0;
                }

                lastUpdated.setDate(lastUpdated.getDate() - 1);
                streak.lastUpdated = lastUpdated;
                break;

        }

        this.streaks.update(id, streak);
    }

    addEntry(name: string) {
        this.streaks.put({
            name,
            longestStreak: 0,
            currentStreak: 0,
            lastUpdated: new Date(0)
        } as StreakEntry);
    }

    deleteEntry(id: number) {
        this.streaks.delete(id);
    }
}

export const Database = new StreakDatabase();
