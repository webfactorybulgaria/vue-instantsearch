import { createApp } from './main';

const createAppWithContext = async context => {
  const { search, application } = createApp();

  await application.$options.asyncData({
    search: (...args) => search.ssr(...args),
  });

  // Attach the state to the context to allow
  // the template to set __INITIAL_STATE__
  context.state = search.serialize();

  return application;
};

export default createAppWithContext;
