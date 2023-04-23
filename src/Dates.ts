export function MidnightTodayLocal(): Date {
    const d = new Date();
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);

    return d;
}

export function MidnightYesterdayLocal(): Date {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);

    return d;
}
