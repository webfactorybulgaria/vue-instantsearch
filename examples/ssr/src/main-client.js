import { createApp } from './main';

const initialState = window.__INITIAL_STATE__ || {
  title: 'Welcome to Your CSR Vue.js App',
};

delete window.__INITIAL_STATE__;

const { application } = createApp(initialState);

application.$mount('#app');
