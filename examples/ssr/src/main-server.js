import { createApp } from './main';

const createAppWithContext = async context => {
  const { search, application } = createApp();

  // Simulate the router - kinda
  await application.$options.asyncData({
    context,
    search,
  });

  // Attach the state to the context to allow
  // the template to set __INITIAL_STATE__
  context.state = search.serialize();

  return application;
};

export default createAppWithContext;
