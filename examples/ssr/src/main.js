import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

export const createApp = state => {
  const application = new Vue({
    render: h =>
      h(App, {
        props: state,
      }),
  });

  return {
    application,
  };
};
