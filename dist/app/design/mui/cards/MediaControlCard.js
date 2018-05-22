"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const PropTypes = require("prop-types");
const styles_1 = require("@material-ui/core/styles");
const core_1 = require("@material-ui/core");
const IconButton_1 = require("@material-ui/core/IconButton");
const Typography_1 = require("@material-ui/core/Typography");
const SkipPrevious_1 = require("@material-ui/icons/SkipPrevious");
const PlayArrow_1 = require("@material-ui/icons/PlayArrow");
const SkipNext_1 = require("@material-ui/icons/SkipNext");
const styles = theme => ({
    card: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
        height: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    playIcon: {
        height: 38,
        width: 38,
    },
});
function MediaControlCard(props) {
    const { classes, theme } = props;
    return (React.createElement("div", null,
        React.createElement(core_1.Card, { className: classes.card },
            React.createElement("div", { className: classes.details },
                React.createElement(core_1.CardContent, { className: classes.content },
                    React.createElement(Typography_1.default, { variant: "headline" }, "Live From Space"),
                    React.createElement(Typography_1.default, { variant: "subheading", color: "textSecondary" }, "Mac Miller")),
                React.createElement("div", { className: classes.controls },
                    React.createElement(IconButton_1.default, { "aria-label": "Previous" }, theme.direction === 'rtl' ? React.createElement(SkipNext_1.default, null) : React.createElement(SkipPrevious_1.default, null)),
                    React.createElement(IconButton_1.default, { "aria-label": "Play/pause" },
                        React.createElement(PlayArrow_1.default, { className: classes.playIcon })),
                    React.createElement(IconButton_1.default, { "aria-label": "Next" }, theme.direction === 'rtl' ? React.createElement(SkipPrevious_1.default, null) : React.createElement(SkipNext_1.default, null)))),
            React.createElement(core_1.CardMedia, { className: classes.cover, image: "https://avatars3.githubusercontent.com/u/1809991?s=400&v=4", title: "Live from space album cover" }))));
}
//@ts-ignore
MediaControlCard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};
exports.default = styles_1.withStyles(styles, { withTheme: true })(MediaControlCard);
