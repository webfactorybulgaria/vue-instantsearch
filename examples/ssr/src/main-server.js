import { createApp } from './main';

const createAppWithContext = () => {
  const { application } = createApp();

  return application;
};

export default createAppWithContext;
