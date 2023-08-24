import React, { useRef } from "react";

import { Database, StreakEntry, isStreakEntry } from "../Database";

export function ImportExport() {
    const fileSelector = useRef<HTMLInputElement>(null);

    function importFile() {
        fileSelector.current?.click();
    }

    function loadFile(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (files === null || files.length < 1) {
            return;
        }

        const reader = new FileReader();
        reader.addEventListener("load", async () => {
            try {
                const streaks = JSON.parse(reader.result as string);
                // if imported data is valid, set it to the db
                if (Array.isArray(streaks.streaks) && streaks.streaks.every((item: any) => isStreakEntry(item))) {

                    // replace json dates with real date objects
                    streaks.streaks = (streaks.streaks as StreakEntry[]).map(item => {
                        item.lastUpdated = new Date(item.lastUpdated);
                        return item;
                    });

                    await Database.streaks.clear();
                    Database.streaks.bulkPut(streaks.streaks);
                }
            } catch {
                return;
            }
        });

        reader.readAsText(files[0]);
    }

    async function exportFile() {
        const data = { streaks: await Database.streaks.toArray() };
        const a = document.createElement("a");
        a.href = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
        a.download = `streaker-${new Date().toJSON()}.json`;

        a.click();
    }

    return (
        <div className="card">
            <div className="card-actions">
                <button className="text" onClick={exportFile}>Export</button>
                <button className="text" onClick={importFile}>Import</button>
                <input ref={fileSelector} style={{ display: "none" }} type="file" accept="application/json, text/json, text/plain" onChange={loadFile} />
            </div>
        </div>
    );
}
