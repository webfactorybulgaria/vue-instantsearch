import Vue from 'vue';
import { createInstantSearch } from './instantsearch';
import App from './App.vue';

Vue.config.productionTip = false;

export const createApp = () => {
  const search = createInstantSearch();

  const application = new Vue({
    search,
    render: h => h(App),
    asyncData({ search }) {
      // - use the state
      return search({
        query: 'iphone',
        page: 5,
        hitsPerPage: 3,
        hierarchicalFacets: [
          {
            name: 'brand',
            attributes: ['brand'],
          },
        ],
        hierarchicalFacetsRefinements: {
          brand: ['Apple'],
        },
      });
    },
  });

  return {
    search,
    application,
  };
};
