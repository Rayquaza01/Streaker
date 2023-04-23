import React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

import { Database, StreakEntry, isStreakEntry } from "../Database";

export function ImportExport() {

    function importFile() {
        (document.querySelector("#import-file-picker") as HTMLInputElement).click();
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
                if (Array.isArray(streaks.streaks) && streaks.streaks.every(item => isStreakEntry(item))) {

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
        <Card sx={{ mt: 2 }}>
            <CardActions>
                <Button onClick={exportFile}>Export</Button>
                <Button onClick={importFile}>Import</Button>
                <input id="import-file-picker" style={{ display: "none" }} type="file" accept="application/json, text/json, text/plain" onChange={loadFile} />
            </CardActions>
        </Card>
    );
}
