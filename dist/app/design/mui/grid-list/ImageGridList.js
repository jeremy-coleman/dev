"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const PropTypes = require("prop-types");
const styles_1 = require("@material-ui/core/styles");
const core_1 = require("@material-ui/core");
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
    subheader: {
        width: '100%',
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
 *     cols: 2,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
function ImageGridList(props) {
    const { classes } = props;
    return (React.createElement("div", { className: classes.root },
        React.createElement(core_1.GridList, { cellHeight: 160, className: classes.gridList, cols: 3 }, tileData_1.default.map(tile => (React.createElement(core_1.GridListTile, { key: tile.img, cols: tile.cols || 1 },
            React.createElement("img", { src: tile.img, alt: tile.title })))))));
}
//@ts-ignore
ImageGridList.propTypes = {
    classes: PropTypes.object.isRequired,
};
exports.default = styles_1.withStyles(styles)(ImageGridList);
