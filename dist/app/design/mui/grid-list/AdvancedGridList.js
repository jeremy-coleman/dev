"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const PropTypes = require("prop-types");
const styles_1 = require("@material-ui/core/styles");
const core_1 = require("@material-ui/core");
const IconButton_1 = require("@material-ui/core/IconButton");
const StarBorder_1 = require("@material-ui/icons/StarBorder");
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
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    titleBar: {
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
        color: 'white',
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
 *     featured: true,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
function AdvancedGridList(props) {
    const { classes } = props;
    return (React.createElement("div", { className: classes.root },
        React.createElement(core_1.GridList, { cellHeight: 200, spacing: 1, className: classes.gridList }, tileData_1.default.map(tile => (React.createElement(core_1.GridListTile, { key: tile.img, cols: tile.featured ? 2 : 1, rows: tile.featured ? 2 : 1 },
            React.createElement("img", { src: tile.img, alt: tile.title }),
            React.createElement(core_1.GridListTileBar, { title: tile.title, titlePosition: "top", actionIcon: React.createElement(IconButton_1.default, { className: classes.icon },
                    React.createElement(StarBorder_1.default, null)), actionPosition: "left", className: classes.titleBar })))))));
}
//@ts-ignore
AdvancedGridList.propTypes = {
    classes: PropTypes.object.isRequired,
};
exports.default = styles_1.withStyles(styles)(AdvancedGridList);
