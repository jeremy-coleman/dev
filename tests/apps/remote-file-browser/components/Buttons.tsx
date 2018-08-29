import * as _ from 'lodash';
import * as React from 'react';

interface ButtonProps {
    data: any[]
    onClick: any
};

class Buttons extends React.Component<ButtonProps, any> {
  
  static defaultProps = {
    data: [],
    onClick: _.noop
};

    render() {
            const buttons = this.props.data.map((buttonData, i) => {
                return (
                    <button key={'button-' + i}
                         className={'button'}
                         onClick={_.partial(this.props.onClick, buttonData.query)}>
                        {buttonData.label}
                    </button>
                );
            });

        return (
            <div className="buttons">
                {buttons}
            </div>
        );
    }
}


export default Buttons;
