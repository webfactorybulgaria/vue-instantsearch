import instantsearch from 'instantsearch.js/es';

export const createInstantSearch = () =>
  instantsearch({
    appId: 'latency',
    apiKey: '6be0576ff61c053d5f9a3225e2a90f76',
    indexName: 'instant_search',
  });
