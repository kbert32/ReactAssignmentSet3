import { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from '../Checkout/Checkout';
import useHttp from '../customHooks/useHttp';

const Cart = (props) => {
  const [order, setOrder] = useState(false);
  const [didSubmit, setdidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const {isLoading, error, sendRequest: sendOrder} = useHttp();

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  function openOrderForm() {
    setOrder(true);
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  }

  function orderSubmitHandler(orderObj) {
    sendOrder({
      url: 'https://food-order-app-57817-default-rtdb.firebaseio.com/orders.json', 
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
        },
      body: orderObj,
    });

    setdidSubmit(true);
  };
  
  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const cartContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {order && <div><Checkout onCancel={props.onClose} orderSubmit={orderSubmitHandler} /></div>}
      {!order && <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button} onClick={openOrderForm} >Order</button>}
      </div>}
    </>
  );

  const isLoadingMessage = <p className={classes.messages}>Sending order...</p>;

  const submittedMessage = (
    <>
      <p className={classes.messages}>Your order has been sent!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>Close</button>
      </div>
    </>
  );

  const errorMessage = (
    <>
      <p className={classes.messages}>Error: {error}</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>Close</button>
      </div>
    </>
  );
  return (
    <Modal onClose={props.onClose}>
      {!isLoading && !error && !didSubmit && cartContent}
      {isLoading && isLoadingMessage}
      {!isLoading && !error && didSubmit && submittedMessage}
      {!isLoading && error && errorMessage}
    </Modal>
  );
};

export default Cart;
