import { useEffect } from "react";
import useInput from "../hooks/use-input";

const BasicForm = () => {
  useEffect(() => {
    document.getElementById('fname').focus();
  }, []);

  const {
    value: firstName,
    isValid: firstNameIsValid,
    hasError: firstNameError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
   } = useInput(value => value.trim() !== '');

  const {
    value: lastName,
    isValid: lastNameIsValid,
    hasError: lastNameError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(value => value.trim() !== '');

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(value => value.includes('@'));

  let formIsValid = false;

  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true;
  }

  function formSubmissionHandler(event) {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log(firstName);
    console.log(lastName);
    console.log(email);

    document.getElementById('fname').focus();

    resetFirstName();
    resetLastName();
    resetEmail();
  };

  const firstNameClasses = firstNameError ? 'form-control invalid' : 'form-control';
  const lastNameClasses = lastNameError ? 'form-control invalid' : 'form-control';
  const emailClasses = emailError ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className='control-group'>
        <div className={firstNameClasses}>
          <label htmlFor='name'>First Name</label>
          <input type='text' id='fname' onChange={firstNameChangeHandler} onBlur={firstNameBlurHandler} value={firstName} />
          {firstNameError && <p className="error-text">First name must not be empty.</p>}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor='lname'>Last Name</label>
          <input type='text' id='lname' onChange={lastNameChangeHandler} onBlur={lastNameBlurHandler} value={lastName} />
          {lastNameError && <p className="error-text">Last name must not be empty.</p>}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor='email'>E-Mail Address</label>
        <input type='email' id='email' onChange={emailChangeHandler} onBlur={emailBlurHandler} value={email} />
        {emailError && <p className="error-text">Must be a valid email.</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
