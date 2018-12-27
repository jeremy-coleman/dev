"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
function generateAsyncComponent(loader) {
    var _a;
    let Component = null;
    return _a = class AsyncRouteComponent extends React.Component {
            constructor() {
                super(...arguments);
                this.state = { Component };
                this.updateState = () => {
                    if (this.state.Component !== Component) {
                        this.setState({ Component });
                    }
                };
            }
            componentDidMount() {
                AsyncRouteComponent.load().then(this.updateState);
            }
            static load() {
                return loader().then(ResolvedComponent => {
                    Component = ResolvedComponent.default || ResolvedComponent;
                });
            }
            render() {
                const { Component: ComponentFromState } = this.state;
                if (ComponentFromState)
                    return React.createElement(ComponentFromState, Object.assign({}, this.props));
                return null;
            }
        },
        _a.displayName = 'AsyncComponent',
        _a;
}
exports.generateAsyncComponent = generateAsyncComponent;
