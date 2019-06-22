import React from 'react';
import ReactDOM from 'react-dom';
import './normalize.css';
import App from './components/App';
import AppStore from './stores/AppStore';

const appStore = new AppStore();
ReactDOM.render(
  <App store={appStore} />,
  document.getElementById('root'),
);
