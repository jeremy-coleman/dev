import * as React from 'react';
import marked from 'marked';


class MarkedComponent extends React.Component<any, any> {
    getMarkdownText() {
        let rawMarkup = marked(this.props.markdown, {sanitize: true});
        return { __html: rawMarkup };
    }
    render() {
        return <div dangerouslySetInnerHTML={this.getMarkdownText()} />
    }
}

export default MarkedComponent;