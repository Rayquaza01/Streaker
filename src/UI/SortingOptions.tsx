import React from "react";

import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export enum SortOrders {
    NAME = "name",
    CREATED = "created",
    MODIFIED = "modified"
}

export interface SortOptions {
    order: SortOrders
    ascending: boolean
}

export function isSortOptions(e?: Record<string, any>): e is SortOptions {
    if (!e) return false;

    return typeof e.order === "string" &&
        ([SortOrders.NAME, SortOrders.CREATED, SortOrders.MODIFIED] as string[]).includes(e.order) &&
        typeof e.ascending === "boolean";
}

export interface SortingOptionsProps {
    options: SortOptions
    setOptions(opts: SortOptions): void
}

export function SortingOptions(props: SortingOptionsProps) {
    function setOrder(e: React.ChangeEvent<HTMLInputElement>) {
        props.setOptions({ ...props.options, order: e.target.value as SortOrders });
    }

    function setAscending(e: React.ChangeEvent<HTMLInputElement>) {
        props.setOptions({ ...props.options, ascending: e.target.value === "true" });
    }

    return (
        <Grid container flexDirection="column">
            <Card sx={{ mt: 2 }}>
                <CardContent>
                    <FormControl>
                        <FormLabel id="sorting-options-label-order">Sort By</FormLabel>
                        <RadioGroup aria-labelledby="sorting-optons-label-order" value={props.options.order} onChange={setOrder}>
                            <FormControlLabel value={SortOrders.NAME} control={<Radio />} label="Name" />
                            <FormControlLabel value={SortOrders.CREATED} control={<Radio />} label="Created" />
                        </RadioGroup>
                    </FormControl>
                </CardContent>
            </Card>
            <Card sx={{ mt: 2 }}>
                <CardContent>
                    <FormControl>
                        <FormLabel id="sorting-options-label-order">Sort Order</FormLabel>
                        <RadioGroup aria-labelledby="sorting-optons-label-order" value={props.options.ascending} onChange={setAscending}>
                            <FormControlLabel value={true} control={<Radio />} label="Ascending" />
                            <FormControlLabel value={false} control={<Radio />} label="Descending" />
                        </RadioGroup>
                    </FormControl>
                </CardContent>
            </Card>
        </Grid>
    )
}
