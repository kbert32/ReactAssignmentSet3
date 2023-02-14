// import { useState, useEffect } from 'react';     //these hooks are no longer imported since they are inherited
                                                    //from the custom hook
import Card from './Card';
import useCounter from '../hooks/use-counter';

const ForwardCounter = () => {
  const counter = useCounter(true);

  // const [counter, setCounter] = useState(0);     //this code is no longer needed in this component since it 
                                                    //has been moved to the custom hook
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCounter((prevCounter) => prevCounter + 1);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  return <Card>{counter}</Card>;
};

export default ForwardCounter;
