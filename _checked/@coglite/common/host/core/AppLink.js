"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class AppLink extends React.Component {
    constructor() {
        super(...arguments);
        this._onClick = (e) => {
            e.preventDefault();
            if (this.props.onClick) {
                this.props.onClick();
            }
            else {
                if (this.props.open) {
                    this.props.host.open(this.props.request).then(openedHost => {
                        if (this.props.onHostOpened) {
                            this.props.onHostOpened(openedHost);
                        }
                    });
                }
                else {
                    this.props.host.load(this.props.request);
                }
            }
        };
    }
    render() {
        const href = this.props.host.getUrl(this.props.request);
        const content = React.Children.count(this.props.children) > 0 ? this.props.children : this.props.title;
        return (React.createElement("a", { style: { color: 'blue' }, className: this.props.className, title: this.props.title, href: href, onClick: this._onClick }, content));
    }
}
exports.AppLink = AppLink;
