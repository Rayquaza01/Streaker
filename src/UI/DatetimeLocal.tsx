import React from "react";
import TextField from "@mui/material/TextField";

// https://stackoverflow.com/questions/30166338/setting-value-of-datetime-local-from-date
function dateToLocalString(d: Date): string {
    const e = new Date(d);
    e.setMinutes(e.getMinutes() - e.getTimezoneOffset());
    return e.toISOString().slice(0, 16);
}

function localStringToDate(s: string): Date {
    const e = new Date(s + ":00.000Z");
    e.setMinutes(e.getMinutes() + e.getTimezoneOffset());
    return e;
}

export interface DatetimeLocalProps {
    label?: string
    value: Date
    onChange: (e: Date) => void
}

export function DatetimeLocal(props: DatetimeLocalProps) {
    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value === "") {
            return;
        }

        const d = localStringToDate(e.target.value);

        props.onChange(d);
    }

    return (
        <TextField label={props.label} type="datetime-local" value={dateToLocalString(props.value)} onChange={onChange} sx={{ width: "100%" }} />
    )
}
