import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { elearningApi } from './features/api/apiSlice';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <ApiProvider api={elearningApi}>
    <App /> 
    </ApiProvider>
    </Provider>
  </React.StrictMode>
);

