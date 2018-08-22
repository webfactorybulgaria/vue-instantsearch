import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

export const createApp = () => {
  const application = new Vue({
    render: h => h(App),
  });

  return {
    application,
  };
};
