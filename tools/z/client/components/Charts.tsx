import * as React from "react";
import { LineChart, Line, Tooltip } from "recharts";

export class Charts extends React.Component {
    public state = {
        data: [
            { uv: 123 },
            { uv: 234 },
            { uv: 32 },
            { uv: 345 },
        ]
    };

    public render() {
        return (
            <div>
                <LineChart width={400} height={200} data={this.state.data}>
                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                    <Tooltip />
                </LineChart>
            </div>
        );
    }
}
