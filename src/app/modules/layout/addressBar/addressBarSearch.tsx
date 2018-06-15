
import * as React from 'react';
import * as Icons from '../../../components/icons';


export class AddressBarSearch extends React.Component<any, any> {
        componentWillMount() {}  //todo..add events or listeners to app-storage here, mayb gotta use ipc
        componentWillUnmount() {}

    searchResultComponents() {
        const settings = null;
        return settings
    }

    render() {
        return (
            <div className="addressbar-search">
                {this.searchResultComponents()}
            </div>
        );
    }
}

interface AddressBarSearchResultProps {
    index: number,
}

export class AddressBarSearchResult extends React.Component<AddressBarSearchResultProps, {}> {
    render() { return (
            <div className='addressbar-searchresult'>
                <div className='addressbar-searchresult-title' onClick={() => console.log('make this do something')}>
                <a className='addressbar-searchresult-a' href='javascript:void(0)' onClick={() => console.log('make this do something')}>
                {this.props.index}
                </a>
                </div>
                <a href='javascript:void(0)' onClick={() => console.log('make this do something')} >
                <div className='addressbar-searchresult-delete' onClick={() => console.log('make this do something')} dangerouslySetInnerHTML={{ __html: Icons.clearCloseIcon('', 16) }} />
                </a>
            </div>
        );
    }
}
