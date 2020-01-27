import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import { AlertContext, useAlertProvider } from './hooks';
import client from './queries/client';
import './theme.scss';
import Main from './views/Main';

export const App = () => {
  const alerts = useAlertProvider();

  return (
    <ApolloProvider client={client}>
      <AlertContext.Provider value={alerts}>
        <Main />
      </AlertContext.Provider>
    </ApolloProvider>
  );
};

export default App;
