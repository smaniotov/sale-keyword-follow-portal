import {
  createContext, useContext, useEffect, useState, useCallback,
} from 'react';

export const AlertContext = createContext(undefined);

export const useAlertProvider = () => {
  const [alerts, setAlerts] = useState(null);
  const refresh = useCallback(() => {
    Promise.resolve({ title: 'Test data' }).then((data) => {
      return data;
    }).then(setAlerts);
  }, []);

  useEffect(refresh, [refresh]);

  return [alerts, alerts === null, refresh];
};

export default function useAlerts() {
  return useContext(AlertContext);
}
