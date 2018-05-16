import * as React from "react";

import "./font-test.scss";

export class FontTest extends React.Component {
    public render() {
        return (
            <div>
                <h2>Fonts</h2>
                <div className="light">This is a <i>light</i> text.</div>
                <div className="regular">This is a <i>regular</i> text.</div>
                <div className="medium">This is a <i>medium</i> text.</div>
                <div className="bold">This is a <i>bold</i> text.</div>
            </div>
        );
    }
}
