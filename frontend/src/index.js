import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// redux
import { Provider } from "react-redux";
import { store } from "./store";

// pegando o elemento root do DOM
const rootElement = document.getElementById("root");

// criando um root com createRoot
const root = ReactDOM.createRoot(rootElement);

// root.render para renderizar o aplicativo
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
