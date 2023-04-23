import Dexie from "dexie";

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

class StreakDatabase extends Dexie {
    streaks!: Dexie.Table<StreakEntry, number>;

    constructor() {
        super("StreakDatabase");
        this.version(1).stores({
            streaks: "++id, lastUpdated"
        });
    }

    addEntry(name: string) {
        this.streaks.put({
            name,
            longestStreak: 0,
            currentStreak: 0,
            lastUpdated: new Date(0)
        } as StreakEntry);
    }
}

export const Database = new StreakDatabase();

Database.streaks.bulkPut([
    { id: 1, name: "Streak 1", longestStreak: 0, currentStreak: 0, lastUpdated: new Date(0) },
    { id: 2, name: "Streak 2", longestStreak: 0, currentStreak: 0, lastUpdated: new Date(0) },
    { id: 3, name: "Streak 3", longestStreak: 0, currentStreak: 0, lastUpdated: new Date(0) },
    { id: 4, name: "Streak 4", longestStreak: 0, currentStreak: 0, lastUpdated: new Date(0) }
])
