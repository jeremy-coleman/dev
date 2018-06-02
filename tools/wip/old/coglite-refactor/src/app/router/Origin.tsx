import * as React from "react";

export const Origin = () => {
    const o = window.location.origin;
    return (
        <div>{o}</div>
    );
};