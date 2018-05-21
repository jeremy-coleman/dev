import {isDefined} from "./types";

/**
 * GeoJSON "standard" for styling geospatial data that can be shared across clients.
 * See https://github.com/mapbox/simplestyle-spec/tree/master/1.1.0
 */
export interface SimpleStyle {
    readonly title?: string;
    readonly description?: string;
    readonly markerSize?: "small" | "medium" | "large";
    readonly markerSymbol?: string;
    readonly markerColor?: string;
    readonly stroke?: string;
    readonly strokeOpacity?: number;
    readonly strokeWidth?: number;
    readonly fill?: string;
    readonly fillOpacity?: number;
}

/**
 * GeoJSON "standard" for styling geospatial data that can be shared across clients.
 * See https://github.com/mapbox/simplestyle-spec/tree/master/1.1.0
 */
export const SIMPLE_STYLE_DEFAULTS: SimpleStyle = {
    title: "",
    description: "",
    markerSize: "medium",
    markerSymbol: "",
    markerColor: "#7e7e7e",
    stroke: "#555555",
    strokeOpacity: 1,
    strokeWidth: 2,
    fill: "#555555",
    fillOpacity: 0.6
};

export function simpleStyleFromFeatureProperties(properties: any): SimpleStyle {
    const styleProperties = {
        title: properties["title"],
        description: properties["description"],
        markerSymbol: properties["marker-symbol"],
        markerSize: properties["marker-size"],
        markerColor: properties["marker-color"],
        stroke: properties["stroke"],
        strokeOpacity: properties["stroke-opacity"],
        strokeWidth: properties["stroke-width"],
        fill: properties["fill"],
        fillOpacity: properties["fill-opacity"],
    };

    const simpleStyle = {};
    for (let p of Object.getOwnPropertyNames(styleProperties)) {
        if (isDefined(styleProperties[p])) {
            simpleStyle[p] = styleProperties[p];
        }
    }

    return simpleStyle;
}

export function featurePropertiesFromSimpleStyle(style: SimpleStyle): any {
    const styleProperties = {
        "title": style.title,
        "description": style.description,
        "marker-symbol": style.markerSymbol,
        "marker-size": style.markerSize,
        "marker-color": style.markerColor,
        "stroke": style.stroke,
        "stroke-opacity": style.strokeOpacity,
        "stroke-width": style.strokeWidth,
        "fill": style.fill,
        "fill-opacity": style.fillOpacity,
    };

    const properties = {};
    for (let p of Object.getOwnPropertyNames(styleProperties)) {
        if (isDefined(styleProperties[p])) {
            properties[p] = styleProperties[p];
        }
    }

    return properties;
}
