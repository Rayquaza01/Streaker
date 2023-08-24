import React, { useState } from "react";

import AddIcon from "../svg/plus.svg";

import { Database } from "../Database";

export function AddEntry() {
    const [content, setContent] = useState("");

    function Submit() {
        if (content.length === 0) return;

        Database.addEntry(content);
        setContent("");
    }

    return (
        <div className="card">
            <div className="card-content add-new">
                <div className="flex-row">
                    <input className="grow" type="text" placeholder="New Streak" value={content} onChange={e => setContent(e.target.value)} />
                    <button className="icon" onClick={Submit}>
                        <AddIcon />
                    </button>
                </div>
            </div>
        </div>
    );
}
