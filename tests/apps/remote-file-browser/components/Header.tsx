import * as _ from 'lodash';
import * as React from 'react';
import WindowUtil from '../util/WindowUtil';
import Buttons from './Buttons';
import HeaderTextRotator from './HeaderTextRotator';

export interface HeaderProps {
 onSearch: any
}

export default class Header extends React.Component<HeaderProps, any> {
static defaultProps = {
    onSearch: _.noop
};
    constructor(props) {
        super(props);

        this.state = {
            buttons: ['user interface', 'synthesizer', 'chess']
        };
    }

    componentDidMount() {
        // reading customized search buttons from the URL (overriding the default ones)
        var buttonsQuery = WindowUtil.getQueryParameterByName('buttons');

        if (buttonsQuery) {
            this.setState({
                buttons: buttonsQuery.split(',')
            });
        }
    }

    renderButtons() {
        const data = this.state.buttons.map((button) => {
            return {
                label: _.startCase(button),
                query: button
            }
        });

        return (
            <Buttons data={data} onClick={this.props.onSearch} />
        );
    }

    render() {
        const buttons = this.renderButtons();

        return (
            <div className="app-header">
                <HeaderTextRotator />
                {buttons}
            </div>
        );
    }
}


