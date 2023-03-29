import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';     //Provider for redux, can be wrapped around any component, but App is most common
import store from './store/index';  //store prop is needed for Provider to point redux to the store file

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}><App /></Provider>);
