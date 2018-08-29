import { ISearchSchemaField } from "./ISearchSchemaField";
import { ISearchRequest } from "./ISearchRequest";
import { ISearchField } from "./ISearchField";

const requestToQuery = (request : ISearchRequest) : any => {
    const query : any = {
        searchString: request.searchString,
        op: request.op
    };
    if(request.fields) {
        request.fields.forEach(field => {
            let current = query[field.name];
            if(current) {
                if(!Array.isArray(current)) {
                    current = [current, field.searchString];
                    query[field.name] = current;
                } else {
                    current.push(field.searchString);
                }
            } else {
                query[field.name] = field.searchString;
            }
        });
    }
    return query;
};

const queryToRequest = (query : any, schema?: ISearchSchemaField[]) : ISearchRequest => {
    const request : ISearchRequest = {};
    if(query) {
        request.searchString = query.searchString;
        request.op = query.op;
        const fields : ISearchField[] = [];
        Object.keys(query).forEach(key => {
            if(key !== "searchString" && key !== "op") {
                if(!schema || schema.some(f => f.key === key)) {
                    const queryValue = query[key];
                    if(queryValue) {
                        if(Array.isArray(queryValue)) {
                            queryValue.forEach(qv => {
                                fields.push({
                                    name: key,
                                    searchString: qv
                                })
                            });
                        } else {
                            fields.push({
                                name: key,
                                searchString: queryValue
                            });
                        }
                    }
                    
                }
            }
        });
        request.fields = fields.length > 0 ? fields : undefined;
    }
    return request;
};

export {
    requestToQuery,
    queryToRequest
}