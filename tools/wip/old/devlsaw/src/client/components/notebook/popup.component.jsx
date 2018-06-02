import * as React from 'react';
import SkyLight from 'react-skylight';


class PopupComponent extends React.Component {
    constructor(props){
        super(props);
    }
    _executeBeforeModalClose(){
        console.log(52);
    }

    render() {

        return (
            <div>
                <section>
                    <button onClick={() => this.simpleDialog.show()}>Open Modal</button>
                </section>
                <SkyLight
                    beforeClose={this._executeBeforeModalClose}
                    hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Hi, I'm a simple modal">
                    Hello, I dont have any callback.
                </SkyLight>
            </div>
        )
    }
}

export default PopupComponent;