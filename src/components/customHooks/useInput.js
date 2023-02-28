// import { useState } from "react";        //converted to using useReducer
import { useReducer } from "react";

const initialInputState = {                 //initial object values for Reducer
    value: '',
    isTouched: false
};

const inputStateReducer = (state, action) => {      //actual Reducer function called by the dispatch function
    if (action.type === 'INPUT') {
        return {value: action.value, isTouched: state.isTouched};
    }

    if (action.type === 'BLUR') {
        return {value: state.value, isTouched: true};   //it is common convention to use a switch statement instead of 'if' 
    }

    return inputStateReducer;                       //***NOT SURE WHY WE ARE RETURNING inputStateReducer, ASK JOHN***
};                                                  //***Reactjs.org examples show this being handled with a 'throw error' statement***/

function useInput(validateValue) {
    // const [enteredValue, setEnteredValue] = useState('');            //converted to useReducer
    // const [isTouched, setIsTouched] = useState(false);

    const [inputState, inputDispatch] = useReducer(inputStateReducer, initialInputState);       //Reducer statement, states are now handled with 'inputState' object

    const valueIsValid = validateValue(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched;

    function valueChangeHandler(event) {
        inputDispatch({type: 'INPUT', value: event.target.value});
        // setEnteredValue(event.target.value);                         //converted to useReducer
    };

    function inputBlurHandler(event) {
        inputDispatch({type: 'BLUR'});
        // setIsTouched(true);
    };

    return {
        value: inputState.value,                    //using Reducer object property value instead of state value
        isValid: valueIsValid,
        hasError: hasError,
        valueChangeHandler: valueChangeHandler,
        inputBlurHandler: inputBlurHandler,
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