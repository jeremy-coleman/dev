import { mergeStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { ISearchFormStyles } from "./SearchForm.styles";

interface ISearchFormClassNames {
    root?: string;
    content?: string;
    textSearch?: string;
    textSearchContainer?: string;
    inputContainer?: string;
    fieldsContainer?: string;
    fieldContainer?: string;
    fieldSelectContainer?: string;
    fieldValueContainer?: string;
    fieldRemoveContainer?: string;
}

const getClassNames = memoizeFunction((styles : ISearchFormStyles, className?: string) : ISearchFormClassNames => {
    return mergeStyleSets({
        root: ["search-form", styles.root, className],
        content: ["search-form-content", styles.content],
        textSearch: ["search-form-text-search", styles.textSearch],
        textSearchContainer: ["search-form-text-search-container", styles.textSearchContainer],
        inputContainer: ["search-form-input-container", styles.inputContainer],
        fieldsContainer: ["search-form-fields-container", styles.fieldsContainer],
        fieldContainer: ["search-form-field-container", styles.fieldContainer],
        fieldSelectContainer: ["search-form-field-select-container", styles.fieldSelectContainer],
        fieldValueContainer: ["search-form-field-value-container", styles.fieldValueContainer],
        fieldRemoveContainer: ["search-form-field-remove-container", styles.fieldRemoveContainer]
    });
});

export { ISearchFormClassNames, getClassNames }