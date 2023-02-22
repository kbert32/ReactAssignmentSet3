import { useState } from "react";

function useInput(validateValue) {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(enteredValue);
    const hasError = !enteredValue && isTouched;

    function valueChangeHandler(event) {
        setEnteredValue(event.target.value);
    };

    function inputBlurHandler(event) {
        setIsTouched(true);
    };

    function reset() {
        setEnteredValue('');
        setIsTouched(false);
    };

    return {
        value: enteredValue,
        isValid: valueIsValid,
        hasError: hasError,
        valueChangeHandler: valueChangeHandler,
        inputBlurHandler: inputBlurHandler,
        reset: reset
    };
};

export default useInput;

//return can also be written as:

// {
//     value: enteredValue,
//     isValid: valueIsValid,
//     hasError,
//     valueChangeHandler,
//     inputBlurHandler,
//     reset
// }