import * as _ from 'lodash';
//import Pager from 'react-pager';
import {Pager} from '@coglite/vendors/react-pager';
import * as React from 'react';

import ImageUtil from "../util/ImageUtil";
import {PAGER_VISIBLE_PAGES} from '../settings';

interface TableProps {
    data: any
    loading: boolean
    numberOfPages: number
    currentPage: number
    handlePageChanged: any
    rowClickHandler: any
    selectedRow: number
};


export default class Table extends React.Component<TableProps, any> {
    static defaultProps = {
    data: [],
    loading: false,
    numberOfPages: 1,
    currentPage: 0,
    handlePageChanged: _.noop,
    rowClickHandler: _.noop,
    selectedRow: -1
    }
    
    renderPager() {
        return (
            <Pager
                total={this.props.numberOfPages}
                current={this.props.currentPage}
                visiblePages={PAGER_VISIBLE_PAGES}
                titles={{ first: 'First', last: 'Last' }}
                className="pager"
                onPageChanged={this.props.handlePageChanged}
            />
        );
    }

    renderRows() {
        let count = 0;

        return this.props.data.map((image) => {
            const data = ImageUtil.convertImageData(image),
                thumbnailData = ImageUtil.normalizeImageData(data.thumbnail),
                slug = data.slug;

            let className = 'search-results-list-row';

            if (this.props.selectedRow === count) {
                className += ' search-results-list-row-selected';
            }

            return (
                <div key={slug}
                     className={className}
                     onClick={_.partial(this.props.rowClickHandler, data, count++)}>
                    <img src={thumbnailData.url}
                         width={thumbnailData.width}
                         height={thumbnailData.height}
                         alt={slug}
                         title={slug} />
                </div>
            );
        });
    }

    renderSpinner() {
        // using multiple layers for the spinner because we want opaque overall background (search-results-spinner-background)
        // but non-opaque text background (search-results-spinner-front-inner)
        return this.props.loading && (
            <div className="search-results-spinner">
                <div className="search-results-spinner-background" />
                <div className="search-results-spinner-front">
                    <div className="search-results-spinner-front-inner">Loading...</div>
                </div>
            </div>
        );
    }
    
    render() {
        const pager = this.renderPager()
        const results = this.renderRows()
        const spinner = this.renderSpinner();

        return (
            <div className="app-left">
                {pager}
                <div className="search-results">
                    <div className="search-results-list">
                        {results}
                    </div>
                    {spinner}
                </div>
            </div>
        );
    }
}



Table.defaultProps = {
    data: [],
    loading: false,
    numberOfPages: 1,
    currentPage: 0,
    handlePageChanged: _.noop,
    rowClickHandler: _.noop,
    selectedRow: -1
};
