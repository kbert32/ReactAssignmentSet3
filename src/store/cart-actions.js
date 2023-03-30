import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
    return  async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch('https://redux-228ed-default-rtdb.firebaseio.com/cart.json');

            if (!response.ok) {
                throw new Error('Could not fetch cart data!');
            }

            const data = await response.json();

            return data;
        };

        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],            //we need to specify an empty array if 'items' does not exist in firebase to avoid getting an undefined error
                totalQuantity: cartData.totalQuantity
            }));
        } catch (error) {
            dispatch(
                uiActions.showNotifications({
                    status: 'error',
                    title: 'Error!',
                    message: 'Retrieving cart data failed!'
                })
            );
        }
    };
};



export function sendCartData(cart) {
    return async (dispatch) => {            //when 'sendCartData' is dispatched in App.js, reduxtoolkit automatically sends the dispatch function as an argument
        dispatch(                           //because this is such a common pattern: we wanna have action creators that can perform side effects, 
            uiActions.showNotifications({   //(since side effects are not allowed within reducers), that can then dispatch other actions which eventually reach  
                status: 'pending',          //the reducers.
                title: 'Sending...',        //This is simply an alternative to having all this logic in our component.
                message: 'Sending cart data!'
              })      
        );

        const sendRequest = async () => {
            const response = await fetch(
                'https://redux-228ed-default-rtdb.firebaseio.com/cart.json', 
                {
                method: 'PUT',
                body: JSON.stringify({items: cart.items, totalQuantity: cart.totalQuantity}),
                }
            );
        
            if (!response.ok) {
            throw new Error('Sending cart data failed.');
            }
        };

        try {
            await sendRequest();

            dispatch(
                uiActions.showNotifications({
                  status: 'success',
                  title: 'Success!',
                  message: 'Sent cart data successfully!'
                })
            );    
        } catch (error) {
            dispatch(
                uiActions.showNotifications({
                    status: 'error',
                    title: 'Error!',
                    message: 'Sending cart data failed!'
                })
            );
        }
    };
};
