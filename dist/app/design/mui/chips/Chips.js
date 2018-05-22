"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const PropTypes = require("prop-types");
const styles_1 = require("@material-ui/core/styles");
const Avatar_1 = require("@material-ui/core/Avatar");
const Chip_1 = require("@material-ui/core/Chip");
const Face_1 = require("@material-ui/icons/Face");
const Done_1 = require("@material-ui/icons/Done");
const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit,
    },
});
function handleDelete() {
    alert('You clicked the delete icon.'); // eslint-disable-line no-alert
}
function handleClick() {
    alert('You clicked the Chip.'); // eslint-disable-line no-alert
}
function Chips(props) {
    const { classes } = props;
    return (React.createElement("div", { className: classes.root },
        React.createElement(Chip_1.default, { label: "Basic Chip", className: classes.chip }),
        React.createElement(Chip_1.default, { avatar: React.createElement(Avatar_1.default, null, "MB"), label: "Clickable Chip", onClick: handleClick, className: classes.chip }),
        React.createElement(Chip_1.default, { avatar: React.createElement(Avatar_1.default, { src: "https://avatars3.githubusercontent.com/u/1809991?s=400&v=4" }), label: "Deletable Chip", onDelete: handleDelete, className: classes.chip }),
        React.createElement(Chip_1.default, { avatar: React.createElement(Avatar_1.default, null,
                React.createElement(Face_1.default, null)), label: "Clickable Deletable Chip", onClick: handleClick, onDelete: handleDelete, className: classes.chip }),
        React.createElement(Chip_1.default, { label: "Custom delete icon Chip", onClick: handleClick, onDelete: handleDelete, className: classes.chip, deleteIcon: React.createElement(Done_1.default, null) })));
}
//@ts-ignore
Chips.propTypes = {
    classes: PropTypes.object.isRequired,
};
exports.default = styles_1.withStyles(styles)(Chips);
