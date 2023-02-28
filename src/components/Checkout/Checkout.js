import classes from './Checkout.module.css';
import useInput from '../customHooks/useInput';
import CartContext from '../../store/cart-context';
import { useContext } from 'react';

const Checkout = (props) => {
  const cartCtx = useContext(CartContext);
  
  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput(value => value.trim() !== '');
  
  const {
    value: street,
    isValid: streetIsValid,
    hasError: streetError,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
  } = useInput(value => value.trim() !== '');
  
  const {
    value: postal,
    isValid: postalIsValid,
    hasError: postalError,
    valueChangeHandler: postalChangeHandler,
    inputBlurHandler: postalBlurHandler,
  } = useInput(value => value.length === 5);
  
  const {
    value: city,
    isValid: cityIsValid,
    hasError: cityError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
  } = useInput(value => value.trim() !== '');
  
  let formIsValid = false;
  
  if (nameIsValid && streetIsValid && postalIsValid && cityIsValid) {
    formIsValid = true;
  }
  
  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    const orderObject = {
      orderedItems: cartCtx.items,
      total: cartCtx.totalAmount,
      user: {
        city,
        name,
        postalCode: postal,
        street,
      },
    };

    props.orderSubmit(orderObject);
    cartCtx.reset();
  };

  const nameClasses = `${classes.control} ${!nameError ? '' : classes.invalid}`;
  const streetClasses = `${classes.control} ${!streetError ? '' : classes.invalid}`;
  const postalClasses = `${classes.control} ${!postalError ? '' : classes.invalid}`;
  const cityClasses = `${classes.control} ${!cityError ? '' : classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' value={name} onChange={nameChangeHandler} onBlur={nameBlurHandler} />
        {nameError && <p>We need a valid name.</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' value={street} onChange={streetChangeHandler} onBlur={streetBlurHandler} />
        {streetError && <p>We need a valid street.</p>}
      </div>
      <div className={postalClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' value={postal} onChange={postalChangeHandler} onBlur={postalBlurHandler} />
        {postalError && <p>We need a valid postal code. (five digits)</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' value={city} onChange={cityChangeHandler} onBlur={cityBlurHandler} />
        {cityError && <p>We need a valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} disabled={!formIsValid}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
