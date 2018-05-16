import * as React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";

export class CounterState {
    @observable
    public count = 0;

    private incTimer;
    private decTimer;

    public constructor() {
        this.incTimer = null;
        this.decTimer = null;
    }

    public increase = () => {
        this.count++;
    }

    public decrease = () => {
        this.count--;
    }

    public reset = () => {
        this.count = 0;

        if (this.incTimer !== null) {
            clearTimeout(this.incTimer);
            this.incTimer = null;
        }

        if (this.decTimer !== null) {
            clearInterval(this.decTimer);
            this.decTimer = null;
        }
    }

    public autoInc = () => {
        if (this.incTimer !== null) {
            clearTimeout(this.incTimer);
            this.incTimer = null;
        } else {
            this.incTimer = setInterval(() => this.increase(), 1000);

            if (this.decTimer !== null) {
                clearInterval(this.decTimer);
                this.decTimer = null;
            }
        }
    }

    public autoDec = () => {
        if (this.decTimer !== null) {
            clearTimeout(this.decTimer);
            this.decTimer = null;
        } else {
            this.decTimer = setInterval(() => this.decrease(), 1000);

            if (this.incTimer !== null) {
                clearTimeout(this.incTimer);
                this.incTimer = null;
            }
        }
    }
}

@observer
export class CounterView extends React.Component<{ state: CounterState }, {}> {
    public render() {
        return (
            <div>
                <h2>Counter: {this.props.state.count}</h2>
                <button onClick={this.props.state.increase}>+</button>
                <button onClick={this.props.state.decrease}>-</button>
                <button onClick={this.props.state.reset}>reset</button>
                <button onClick={this.props.state.autoInc}>auto +</button>
                <button onClick={this.props.state.autoDec}>auto -</button>
            </div>
        );
    }
}
