import { mergeStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IMomentFieldStyles } from "./MomentField.styles";

interface IMomentFieldClassNames {
    root?: string;
    inputContainer?: string;
    textField?: string;
    calendarButtonContainer?: string;
    calendarButton?: string;
}

const getClassNames = memoizeFunction((styles : IMomentFieldStyles, className?: string) => {
    return mergeStyleSets({
        root: ["moment-field", className, styles.root],
        inputContainer: ["moment-field-input-container", styles.inputContainer],
        textField: ["moment-field-text-field", styles.textField],
        calendarButtonContainer: ["moment-field-calendar-container", styles.calendarButtonContainer],
        calendarButton: ["moment-field-calendar-button", styles.calendarButton]
    });
});

export { IMomentFieldClassNames, getClassNames }