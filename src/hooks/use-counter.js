import { useState, useEffect } from "react";

function useCounter(forwards = true) {                         //the name of a custom hook function MUST begin with 'use'
    const [counter, setCounter] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        if (forwards) {
            setCounter((prevCounter) => prevCounter + 1);
        } else {
            setCounter((prevCounter) => prevCounter - 1);
        }
      }, 1000);
  
      return () => clearInterval(interval);
    }, [forwards]); 
    
    return counter;
};

export default useCounter;


//when a custom hook is used in a component, the component inherits whatever states are used in the custom hook
//if the custom hook is used in multiple components, they all inherit their own states from the custom hook
//only the logic is shared