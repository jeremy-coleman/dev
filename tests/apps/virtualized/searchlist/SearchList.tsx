import * as React from 'react';

import './virtualized-searchlist.css'
import { Page } from './components/page';

class SearchList extends React.Component<{}, {}> {
    public render() {
        return (<div className="virtualized-list-search-root"><Page /></div>);
    }
}


export {SearchList as default, SearchList}