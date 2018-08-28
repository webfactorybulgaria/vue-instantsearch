import { createApp } from './main';

const createAppWithContext = async context => {
  const { search, application } = createApp();

  // use QS to parse the URL to fetch an object
  // then provide this object to the asyncData
  // to create the SearchParameters - do it for
  // each of the widgets present on the DEMO

  // Simulate the router - kinda
  await application.$options.asyncData({
    search: (...args) => search.ssr(...args),
  });

  // Attach the state to the context to allow
  // the template to set __INITIAL_STATE__
  context.state = search.serialize();

  return application;
};

export default createAppWithContext;
