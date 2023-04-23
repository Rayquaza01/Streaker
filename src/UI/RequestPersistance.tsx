import React, { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export function RequestPersistance() {
    const [showDialog, setShowDialog] = useState(false);

    function permission() {
        navigator.storage.persist().then(persisted => {
            if (persisted) {
                setShowDialog(false);
            }
        });
    }

    function ignore() {
        localStorage.setItem("ignorePersist", "true");
        setShowDialog(false);
    }

    useEffect(() => {
        const isIgnored = localStorage.getItem("ignorePersist") !== null;

        // if storage manager is missing, or if is ignored, don't show dialog
        if (!navigator.storage || isIgnored) {
            setShowDialog(false);
            return;
        }

        navigator.storage.persisted().then(persisted => {
            // if not ignored and not persisted, show dialog
            if (!isIgnored && !persisted) {
                setShowDialog(true);
            } else {
                setShowDialog(false);
            }
        });
    }, []);

    return (
        <div>
            { showDialog &&
                <Card sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h5">
                            Set Persistant Storage
                        </Typography>
                        <Typography variant="body1">
                            Streaker uses IndexedDB to store data. However, IndexedDB may be cleared by the browser unless it is peristant. In order to make sure that Streaker's data isn't cleared, we need permission to store persistant data.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={permission}>Grant Permission</Button>
                        <Button onClick={ignore}>Don't show again</Button>
                    </CardActions>
                </Card>
            }
        </div>
    );
}
