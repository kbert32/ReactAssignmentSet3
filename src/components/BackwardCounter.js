// import { useState, useEffect } from 'react';   //no longer needed since they are inherited from the useCounter hook

import Card from './Card';
import useCounter from '../hooks/use-counter';

const BackwardCounter = () => {
  const counter = useCounter(false);

  // const [counter, setCounter] = useState(0);     //this code is no longer needed since it is now in the useCounter hook

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCounter((prevCounter) => prevCounter - 1);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  return <Card>{counter}</Card>;
};

export default BackwardCounter;
