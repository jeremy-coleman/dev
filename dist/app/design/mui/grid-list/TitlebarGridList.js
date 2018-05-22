"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const PropTypes = require("prop-types");
const styles_1 = require("@material-ui/core/styles");
const core_1 = require("@material-ui/core");
const core_2 = require("@material-ui/core");
const IconButton_1 = require("@material-ui/core/IconButton");
const Info_1 = require("@material-ui/icons/Info");
const tileData_1 = require("./tileData");
const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
});
/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
function TitlebarGridList(props) {
    const { classes } = props;
    return (React.createElement("div", { className: classes.root },
        React.createElement(core_1.GridList, { cellHeight: 180, className: classes.gridList },
            React.createElement(core_1.GridListTile, { key: "Subheader", cols: 2, style: { height: 'auto' } },
                React.createElement(core_2.ListSubheader, { component: "div" }, "December")),
            tileData_1.default.map(tile => (React.createElement(core_1.GridListTile, { key: tile.img },
                React.createElement("img", { src: tile.img, alt: tile.title }),
                React.createElement(core_1.GridListTileBar, { title: tile.title, subtitle: React.createElement("span", null,
                        "by: ",
                        tile.author), actionIcon: React.createElement(IconButton_1.default, { className: classes.icon },
                        React.createElement(Info_1.default, null)) })))))));
}
//@ts-ignore
TitlebarGridList.propTypes = {
    classes: PropTypes.object.isRequired,
};
exports.default = styles_1.withStyles(styles)(TitlebarGridList);
