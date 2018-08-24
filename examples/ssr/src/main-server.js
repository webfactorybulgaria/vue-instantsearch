import { createApp } from './main';
import mock from './mock';

const createAppWithContext = context => {
  const { search, application } = createApp();

  // Simulate the network call
  search.inject(mock);

  // Attach the state to the context to allow
  // the template to set __INITIAL_STATE__
  context.state = mock;

  // Start the SSR instance
  search.startSSR();

  return application;
};

export default createAppWithContext;
