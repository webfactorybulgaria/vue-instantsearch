import Vue from 'vue';
import { createInstantSearchState } from 'instantsearch.js/es/state/createInstantSearchState';
import { configure } from 'instantsearch.js/es/state/configure';
import { searchBox } from 'instantsearch.js/es/state/searchBox';
import { hits } from 'instantsearch.js/es/state/hits';
import { pagination } from 'instantsearch.js/es/state/pagination';
import { menu } from 'instantsearch.js/es/state/menu';
import { createInstantSearch } from './instantsearch';
import App from './App.vue';

Vue.config.productionTip = false;

export const createApp = () => {
  const search = createInstantSearch();

  const application = new Vue({
    search,
    render: h => h(App),
    asyncData({ context, search }) {
      const state = createInstantSearchState(
        context,
        configure({
          params: {
            searchParameters: {
              hitsPerPage: 3,
            },
          },
        }),
        menu({
          params: {
            attributeName: 'brand',
          },
        }),
        searchBox(),
        hits({
          params: {
            escapeHits: true,
          },
        }),
        pagination()
      );

      return search.ssr(state);
    },
  });

  return {
    search,
    application,
  };
};
