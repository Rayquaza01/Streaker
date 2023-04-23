import React, { useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

import { Database } from "../Database";

export function AddEntry() {
    const [content, setContent] = useState("");

    function Submit() {
        if (content.length === 0) return;

        Database.addEntry(content);
        setContent("");
    }

    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Grid container>
                    <Grid item flexGrow={1}>
                        <TextField variant="standard" placeholder="New Entry" value={content} onChange={e => setContent(e.target.value)} sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item>
                        <IconButton onClick={Submit}>
                            <AddIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
