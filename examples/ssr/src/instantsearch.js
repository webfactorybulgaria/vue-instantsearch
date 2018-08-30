import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js/es';

export const createInstantSearch = () => {
  const searchClient = algoliasearch(
    'latency',
    '6be0576ff61c053d5f9a3225e2a90f76'
  );

  return instantsearch({
    indexName: 'instant_search',
    searchClient,
    routing: true,
  });
};
