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
        maxWidth: 345,
    },
    media: {
        height: 200,
    },
};
function SimpleMediaCard(props) {
    const { classes } = props;
    return (React.createElement("div", null,
        React.createElement(core_1.Card, { className: classes.card },
            React.createElement(core_1.CardMedia, { className: classes.media, image: "https://avatars3.githubusercontent.com/u/1809991?s=400&v=4", title: "Contemplative Reptile" }),
            React.createElement(core_1.CardContent, null,
                React.createElement(Typography_1.default, { gutterBottom: true, variant: "headline", component: "h2" }, "Lizard"),
                React.createElement(Typography_1.default, { component: "p" }, "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica")),
            React.createElement(core_1.CardActions, null,
                React.createElement(Button_1.default, { size: "small", color: "primary" }, "Share"),
                React.createElement(Button_1.default, { size: "small", color: "primary" }, "Learn More")))));
}
//@ts-ignore
SimpleMediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};
exports.default = styles_1.withStyles(styles)(SimpleMediaCard);
