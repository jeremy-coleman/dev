import * as React from "react";
import { Details } from "../Details";
import { IDetailsStyles } from "../Details.styles";

const styleOverrides : IDetailsStyles = {
    root: {
        margin: 4
    },
    body: {
        padding: 8
    }
};

class DetailsSample extends React.Component<any, any> {
    render() {
        return (
            <div className="details-samples">
                <Details styles={styleOverrides} iconProps={{ iconName: "Accounts"}} title="Details Sample 1">
                    Sample 1
                </Details>
                <Details styles={styleOverrides} iconProps={{ iconName: "Badge"}} title="Details Sample 2">
                    Sample 2
                </Details>
                <Details styles={styleOverrides} iconProps={{ iconName: "BirthdayCake"}} title="Details Sample 3" controlOnHeaderClick>
                    Sample 3
                </Details>
                <Details styles={styleOverrides} iconProps={{ iconName: "Breakfast"}} title="Details Sample 4" border controlOnHeaderClick>
                    Sample 4 (with border)
                </Details>
            </div>
        );
    }
}

export { DetailsSample, DetailsSample as default }