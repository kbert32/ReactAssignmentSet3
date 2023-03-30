import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
// import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification.';
import { fetchCartData, sendCartData } from './store/cart-actions';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }

    //All of this code was moved to 'cart-actions.js' in order to keep our component lean

    // async function sendCartData() {
    //   dispatch(
    //     uiActions.showNotifications({
    //       status: 'pending',
    //       title: 'Sending...',
    //       message: 'Sending cart data!'
    //     })
    //   );

    //   const response = await fetch(
    //     'https://redux-228ed-default-rtdb.firebaseio.com/cart.json', 
    //     {
    //     method: 'PUT',
    //     body: JSON.stringify(cart),
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error('Sending cart data failed.');
    //   }

    //   dispatch(
    //     uiActions.showNotifications({
    //       status: 'success',
    //       title: 'Success!',
    //       message: 'Sent cart data successfully!'
    //     })
    //   );
    // };

    // if (isInitial) {
    //   isInitial = false;
    //   return;
    // }

    // sendCartData().catch((error) => {
    //   dispatch(
    //     uiActions.showNotifications({
    //       status: 'error',
    //       title: 'Error!',
    //       message: 'Sending cart data failed!'
    //     })
    //   );
    // })

  }, [cart, dispatch]);   //redux ensures that the 'dispatch' function will never change so it will not trigger useEffect

  return (
    <>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>    
    </>
  );
}

export default App;


//side effects and async tasks can be run one of two ways:
//
//1.Inside the components (useEffect) - this method is commented out within the component
//2. Inside the action creators - the logic has been moved to 'cart-actions.js' withing the 'SendCartData' function


//Redux DevTools can be used as a stand alone app, or as a browser extension; useful for debugging redux apps