import { createContext, ReactNode, useContext, useState } from "react";

import { ToastProvider } from "./toast";

type AppContextState = {
  popout: boolean;
  setPopout: (value: boolean) => void;
};

const AppContext = createContext({} as AppContextState);

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [popout, setPopout] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{ popout, setPopout }}>
      <ToastProvider>{children}</ToastProvider>
    </AppContext.Provider>
  );
}
