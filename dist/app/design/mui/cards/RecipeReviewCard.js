"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const PropTypes = require("prop-types");
const styles_1 = require("@material-ui/core/styles");
const classnames_1 = require("classnames");
const core_1 = require("@material-ui/core");
const Collapse_1 = require("@material-ui/core/Collapse");
const Avatar_1 = require("@material-ui/core/Avatar");
const IconButton_1 = require("@material-ui/core/IconButton");
const Typography_1 = require("@material-ui/core/Typography");
const red_1 = require("@material-ui/core/colors/red");
const Favorite_1 = require("@material-ui/icons/Favorite");
const Share_1 = require("@material-ui/icons/Share");
const ExpandMore_1 = require("@material-ui/icons/ExpandMore");
const MoreVert_1 = require("@material-ui/icons/MoreVert");
const styles = theme => ({
    card: {
        maxWidth: 400,
    },
    media: {
        height: 194,
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red_1.default[500],
    },
});
class RecipeReviewCard extends React.Component {
    constructor() {
        super(...arguments);
        this.state = { expanded: false };
        this.handleExpandClick = () => {
            this.setState({ expanded: !this.state.expanded });
        };
    }
    render() {
        const { classes } = this.props;
        return (React.createElement("div", null,
            React.createElement(core_1.Card, { className: classes.card },
                React.createElement(core_1.CardHeader, { avatar: React.createElement(Avatar_1.default, { "aria-label": "Recipe", className: classes.avatar }, "R"), action: React.createElement(IconButton_1.default, null,
                        React.createElement(MoreVert_1.default, null)), title: "Shrimp and Chorizo Paella", subheader: "September 14, 2016" }),
                React.createElement(core_1.CardMedia, { className: classes.media, image: "https://avatars3.githubusercontent.com/u/1809991?s=400&v=4", title: "Contemplative Reptile" }),
                React.createElement(core_1.CardContent, null,
                    React.createElement(Typography_1.default, { component: "p" }, "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.")),
                React.createElement(core_1.CardActions, { className: classes.actions, disableActionSpacing: true },
                    React.createElement(IconButton_1.default, { "aria-label": "Add to favorites" },
                        React.createElement(Favorite_1.default, null)),
                    React.createElement(IconButton_1.default, { "aria-label": "Share" },
                        React.createElement(Share_1.default, null)),
                    React.createElement(IconButton_1.default, { className: classnames_1.default(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                        }), onClick: this.handleExpandClick, "aria-expanded": this.state.expanded, "aria-label": "Show more" },
                        React.createElement(ExpandMore_1.default, null))),
                React.createElement(Collapse_1.default, { in: this.state.expanded, timeout: "auto", unmountOnExit: true },
                    React.createElement(core_1.CardContent, null,
                        React.createElement(Typography_1.default, { paragraph: true, variant: "body2" }, "Method:"),
                        React.createElement(Typography_1.default, { paragraph: true }, "Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes."),
                        React.createElement(Typography_1.default, { paragraph: true }, "Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add piment\u00F3n, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil."),
                        React.createElement(Typography_1.default, { paragraph: true }, "Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook again without stirring, until mussels have opened and rice is just tender, 5 to 7 minutes more. (Discard any mussels that don\u2019t open.)"),
                        React.createElement(Typography_1.default, null, "Set aside off of the heat to let rest for 10 minutes, and then serve."))))));
    }
}
//@ts-ignore
RecipeReviewCard.propTypes = {
    classes: PropTypes.object.isRequired,
};
exports.default = styles_1.withStyles(styles)(RecipeReviewCard);
