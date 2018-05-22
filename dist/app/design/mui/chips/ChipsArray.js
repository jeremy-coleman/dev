"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const PropTypes = require("prop-types");
const styles_1 = require("@material-ui/core/styles");
const Avatar_1 = require("@material-ui/core/Avatar");
const Chip_1 = require("@material-ui/core/Chip");
const Paper_1 = require("@material-ui/core/Paper");
const TagFaces_1 = require("@material-ui/icons/TagFaces");
const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing.unit / 2,
    },
    chip: {
        margin: theme.spacing.unit / 2,
    },
});
class ChipsArray extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            chipData: [
                { key: 0, label: 'Angular' },
                { key: 1, label: 'jQuery' },
                { key: 2, label: 'Polymer' },
                { key: 3, label: 'React' },
                { key: 4, label: 'Vue.js' },
            ],
        };
        this.handleDelete = data => () => {
            if (data.label === 'React') {
                alert('Why would you want to delete React?! :)'); // eslint-disable-line no-alert
                return;
            }
            const chipData = [...this.state.chipData];
            const chipToDelete = chipData.indexOf(data);
            chipData.splice(chipToDelete, 1);
            this.setState({ chipData });
        };
    }
    render() {
        const { classes } = this.props;
        return (React.createElement(Paper_1.default, { className: classes.root }, this.state.chipData.map(data => {
            let avatar = null;
            if (data.label === 'React') {
                avatar = (React.createElement(Avatar_1.default, null,
                    React.createElement(TagFaces_1.default, { className: classes.svgIcon })));
            }
            return (React.createElement(Chip_1.default, { key: data.key, avatar: avatar, label: data.label, onDelete: this.handleDelete(data), className: classes.chip }));
        })));
    }
}
//@ts-ignore
ChipsArray.propTypes = {
    classes: PropTypes.object.isRequired,
};
exports.default = styles_1.withStyles(styles)(ChipsArray);
