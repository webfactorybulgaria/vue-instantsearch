import Vue from 'vue';
import { createInstantSearch } from './instantsearch';
import App from './App.vue';

Vue.config.productionTip = false;

export const createApp = () => {
  const search = createInstantSearch();

  const application = new Vue({
    search,
    render: h => h(App),
  });

  return {
    search,
    application,
  };
};
