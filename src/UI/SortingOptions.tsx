import React from "react";

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
        <div className="flex-column drawer-list">
            <div className="card">
                <div className="card-content">
                    <fieldset>
                        <legend>Sort By</legend>

                        <div className="flex-column">
                            <label>
                                <input type="radio" name="sort-order" value={SortOrders.NAME} checked={props.options.order === SortOrders.NAME} onChange={setOrder} />
                                Name
                            </label>
                            <label>
                                <input type="radio" name="sort-order" value={SortOrders.CREATED} checked={props.options.order === SortOrders.CREATED} onChange={setOrder} />
                                Created
                            </label>
                        </div>
                    </fieldset>
                </div>
            </div>
            <div className="card">
                <div className="card-content">
                    <fieldset>
                        <legend>Sort Order</legend>

                        <div className="flex-column">
                            <label>
                                <input type="radio" name="sort-ascending" value="true" checked={props.options.ascending} onChange={setAscending} />
                                Ascending
                            </label>
                            <label>
                                <input type="radio" name="sort-ascending" value="false" checked={!props.options.ascending} onChange={setAscending} />
                                Descending
                            </label>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    );
}
