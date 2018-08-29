import * as React from "react";
import { split } from "../../StringUtils";
import { ISearchResponseFieldHighlighting } from "../ISearchResponse";

const Defaults = {
    openDelim: "${",
    closeDelim: "}"
}

const splitHighlight = (highlight : string, openDelim : string = Defaults.openDelim, closeDelim : string = Defaults.closeDelim) : string[] => {
    return split(highlight, ch => {
        return openDelim.indexOf(ch) >= 0 || closeDelim.indexOf(ch) >= 0;
    });
}

const stripHighlightDelims = (highlight : string, openDelim : string = Defaults.openDelim, closeDelim : string = Defaults.closeDelim) : string => {
    const els = splitHighlight(highlight, openDelim, closeDelim);
    return els.join("");
};

interface ISearchFieldHighlightingProps {
    highlighting: ISearchResponseFieldHighlighting;
    field: string;
    value: string;
    onRenderHighlightElement?: (value : string) => React.ReactNode;
    openDelim?: string;
    closeDelim?: string;
}

class SearchFieldHighlighting extends React.Component<ISearchFieldHighlightingProps, any> {
    protected _onRenderHighlightElement = (value : string) : React.ReactNode => {
        if(this.props.onRenderHighlightElement) {
            return this.props.onRenderHighlightElement(value);
        }
        return <strong>{value}</strong>;
    }
    protected _onRenderHighlight = (value : string) => {
        const openDelim = this.props.openDelim || Defaults.openDelim;
        const closeDelim = this.props.closeDelim || Defaults.closeDelim;
        const r = [];
        const els = splitHighlight(value, openDelim, closeDelim);
        els.forEach((el, idx) => {
            const hl = `${openDelim}${el}${closeDelim}`;
            if(value.indexOf(hl) >= 0) {
                r.push(<strong key={idx}>{el}</strong>);
            } else {
                r.push(el);
            }
        });
        return r;
    }
    render() {
        const { highlighting, field, value } = this.props;
        const fieldHighlights = highlighting[field];
        if(fieldHighlights && fieldHighlights.length > 0) {
            const highlight = fieldHighlights.find(h => {
                return value === stripHighlightDelims(h);
            });
            if(highlight) {
                return this._onRenderHighlight(highlight);
            }
        }
        
        return value;
    }
}

export { ISearchFieldHighlightingProps, SearchFieldHighlighting }
