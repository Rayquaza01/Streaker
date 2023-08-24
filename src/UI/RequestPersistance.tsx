import React, { useState, useEffect } from "react";

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
                <div className="card persist">
                    <div className="card-content">
                        <span className="text-title">
                            Set Persistant Storage
                        </span>
                        <span className="text-body">
                            Streaker uses IndexedDB to store data. However, IndexedDB may be cleared by the browser unless it is peristant. In order to make sure that Streaker's data isn't cleared, we need permission to store persistant data.
                        </span>
                    </div>
                    <div className="card-actions">
                        <button className="text" onClick={permission}>Grant Permission</button>
                        <button className="text" onClick={ignore}>Don't show again</button>
                    </div>
                </div>
            }
        </div>
    );
}
