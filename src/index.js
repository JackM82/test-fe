import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import loginReducer from './Reducer/loginSlice'
import postsReducer from './Reducer/postsSlice'
import postsFilteredReducer from './Reducer/postsFilterSlice'
import postSendReducer from './Reducer/addPostSlice'

const reducer = combineReducers({
  loginState: loginReducer,
  postsState: postsReducer,
  postsFilteredState: postsFilteredReducer,
  postSendState: postSendReducer
})

const store = configureStore({
  reducer
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);


