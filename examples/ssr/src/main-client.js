import { createApp } from './main';

const { search, application } = createApp();

if (window.__INITIAL_STATE__) {
  search.inject(window.__INITIAL_STATE__);
}

application.$mount('#app');
