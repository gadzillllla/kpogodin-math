import './styles/index.css';
import './styles/vars.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './state/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
);
