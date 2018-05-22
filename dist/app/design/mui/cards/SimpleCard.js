"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const PropTypes = require("prop-types");
const styles_1 = require("@material-ui/core/styles");
const core_1 = require("@material-ui/core");
const Button_1 = require("@material-ui/core/Button");
const Typography_1 = require("@material-ui/core/Typography");
const styles = {
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};
function SimpleCard(props) {
    const { classes } = props;
    const bull = React.createElement("span", { className: classes.bullet }, "\u2022");
    return (React.createElement("div", null,
        React.createElement(core_1.Card, { className: classes.card },
            React.createElement(core_1.CardContent, null,
                React.createElement(Typography_1.default, { className: classes.title, color: "textSecondary" }, "Word of the Day"),
                React.createElement(Typography_1.default, { variant: "headline", component: "h2" },
                    "be",
                    bull,
                    "nev",
                    bull,
                    "o",
                    bull,
                    "lent"),
                React.createElement(Typography_1.default, { className: classes.pos, color: "textSecondary" }, "adjective"),
                React.createElement(Typography_1.default, { component: "p" },
                    "well meaning and kindly.",
                    React.createElement("br", null),
                    '"a benevolent smile"')),
            React.createElement(core_1.CardActions, null,
                React.createElement(Button_1.default, { size: "small" }, "Learn More")))));
}
//@ts-ignore
SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};
exports.default = styles_1.withStyles(styles)(SimpleCard);
