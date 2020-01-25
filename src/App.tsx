import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import client from './queries/client';
import { AlertContext, useAlertProvider } from './hooks';
import Main from './views/Main';
import './theme.scss';

export const App = () => {
  const alerts = useAlertProvider();

  return (
    <ApolloProvider client={client}>
      <AlertContext.Provider value={alerts}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </AlertContext.Provider>
    </ApolloProvider>
  );
};

export default App;
