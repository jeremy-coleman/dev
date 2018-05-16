import * as React from "react";
import * as ReactDOM from "react-dom";

import { CounterView, CounterState } from "./components/Counter";
import { FontTest } from "./components/FontTest";
import { Charts } from "./components/Charts";
import { UIKit } from "./components/UIKit";

import {Header} from './header'

import "./styles/common.scss";

ReactDOM.render(
    <div>
        <Header/>
        <h1 className="test">Desktop App</h1>
        <CounterView state={new CounterState()} />
        <FontTest />
        <Charts />
        <UIKit />
    </div>,
    document.getElementById("coglite")
);
