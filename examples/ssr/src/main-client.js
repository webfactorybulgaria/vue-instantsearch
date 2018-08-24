import { createApp } from './main';
// import mock from './mock';

const { search, application } = createApp();

// Simulate INITIAL_STATE
// window.__INITIAL_STATE__ = mock;

if (window.__INITIAL_STATE__) {
  search.inject(window.__INITIAL_STATE__);
}

application.$mount('#app');
