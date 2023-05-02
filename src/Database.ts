import Dexie from "dexie";
import { MidnightYesterdayLocal } from "./Dates";

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
                this.update(item.id, item.currentStreak, item.longestStreak, true);
            });
        });
    }

    update(id: number, currentStreak: number, longestStreak: number, reset = false) {
        if (reset) {
            currentStreak = 0;

            this.streaks.update(id, { currentStreak });
        } else {
            const lastUpdated = new Date();
            currentStreak++;
            if (currentStreak > longestStreak) {
                longestStreak = currentStreak;
            }

            this.streaks.update(id, { currentStreak, longestStreak, lastUpdated });
        }

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
