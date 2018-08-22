import { createApp } from './main';

const createAppWithContext = context => {
  // Imagine this is an asyc call
  const state = {
    title: 'Welcome to Your SSR Vue.js App',
  };

  const { application } = createApp(state);

  // Attach the state to the context to allow
  // the template to set __INITIAL_STATE__
  context.state = state;

  return application;
};

export default createAppWithContext;
