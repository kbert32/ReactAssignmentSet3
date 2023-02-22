import {useRef, useState} from 'react';

const SimpleInput = (props) => {
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState('');

  function nameInputChangeHandler(event) {
    setEnteredName(event.target.value);
  };

  function formSubmissionHandler(event) {
    event.preventDefault();
    
    console.log(enteredName);
    
    const enteredValue = nameInputRef.current.value;
    console.log(enteredValue);

    // nameInputRef.current.value = '';          //Not ideal.  Not good to manipulate the DOM directly
    setEnteredName('');
  };


  return (
    <form onSubmit={formSubmissionHandler}>
      <div className='form-control'>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' onChange={nameInputChangeHandler} ref={nameInputRef} value={enteredName} />
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
