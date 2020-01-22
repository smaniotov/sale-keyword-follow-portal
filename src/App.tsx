import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateAlert from './views/CreateAlert';
import { useAlertProvider, AlertContext } from './hooks';

export const App = () => {
  const alerts = useAlertProvider();

  return (
    <AlertContext.Provider value={alerts}>
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <CreateAlert />
          </Route>
        </Switch>
      </BrowserRouter>
    </AlertContext.Provider>
  );
};

export default App;
