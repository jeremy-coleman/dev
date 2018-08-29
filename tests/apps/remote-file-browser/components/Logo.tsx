import * as React from 'react';

export default class Logo extends React.Component<any, any> {

    render() {
        return (
            <div className='flex-parent-centered transparent-for-clicks'>
                <div className='logo'>
                    <div className='logo-title'>Giphy browser</div>
                    <div className='logo-subtitle'>[ click the search buttons above ]</div>
                </div>
            </div>
        );
    }
}