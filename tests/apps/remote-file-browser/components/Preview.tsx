import * as _ from 'lodash';
import * as React from 'react';
import {ClipboardButton} from './_ClipboardButton';
//import ClipboardButton from 'react-clipboard.js';

class Preview extends React.Component<any, any> {

    render() {
        const data = this.props.data,
            slug = data.slug,
            previewImage = _.get(data, 'preview');

        return previewImage && (
            <div className='preview'>
                <img src={previewImage.url}
                     width={previewImage.width}
                     height={previewImage.height}
                     alt={slug}
                     title={slug} />
                <div className='preview-details'>
                    <div className='preview-details-width'>Width: {previewImage.width}</div>
                    <div className='preview-details-height'>Height: {previewImage.height}</div>
                    <div className='preview-details-size'>Size: {previewImage.size}</div>
                    <ClipboardButton
                        data-clipboard-text={previewImage.url}
                        className='button preview-details-clipboard-button'
                        button-title='Click to copy URL'>Copy URL
                    </ClipboardButton>
                    <a target='_blank'
                       className='preview-details-open-in-new-tab-link'
                       href={previewImage.url}>
                        <button className='button'>Open in new tab</button>
                    </a>
                </div>
            </div>
        )
    }
}


export default Preview;
