import React, { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export function RequestPersistance() {
    const [persist, setPersist] = useState(true);

    function permission() {
        navigator.storage.persist().then(persisted => {
            if (persisted) {
                setPersist(true);
            }
        });
    }

    function ignore() {
        localStorage.setItem("ignorePersist", "true");
        setPersist(true);
    }

    useEffect(() => {
        // if no storage manager, don't try to request permission
        if (!navigator.storage) {
            return;
        }

        if (localStorage.getItem("ignorePersist") === null) {
            // if not ignored, display widget
            setPersist(false);
        }

        navigator.storage.persisted().then(persisted => {
            if (!persisted) {
                setPersist(false);
            }
        });
    }, []);

    return (
        <div>
            { !persist &&
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
