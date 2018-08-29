import { ISearchField } from "./ISearchField";

interface ISearchGroup {
    op?: string;
    fields?: ISearchField[];
    groups?: ISearchGroup[];
}

export { ISearchGroup }