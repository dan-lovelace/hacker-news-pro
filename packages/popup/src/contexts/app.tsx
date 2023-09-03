import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { DEFAULT_OPTIONS, storageGetByKey, storageSetByKeys } from "@hnp/core";
import { TOptions } from "@hnp/types";

import { ToastProvider } from "./toast";

type AppContextState = {
  options: TOptions;
  popout: boolean;
  handleOptionChange: <TKey extends keyof TOptions>(
    option: TKey,
    value: TOptions[TKey],
  ) => void;
  setPopout: (value: boolean) => void;
};

const AppContext = createContext({} as AppContextState);

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [initialized, setInitialized] = useState(false);
  const [options, setOptions] = useState<TOptions>(DEFAULT_OPTIONS);
  const [popout, setPopout] = useState<boolean>(false);

  useEffect(() => {
    function init() {
      storageGetByKey("OPTIONS").then((storedOptions) => {
        setOptions({
          ...options,
          ...storedOptions,
        });
        setInitialized(true);
      });
    }
    init();
  }, []);

  const handleOptionChange = <TKey extends keyof TOptions>(
    option: TKey,
    value: TOptions[TKey],
  ) => {
    const newOptions: TOptions = {
      ...options,
      [option]: value,
    };

    setOptions(newOptions);
    storageSetByKeys({
      OPTIONS: newOptions,
    });
  };

  return (
    <>
      {/* {initialized && ( */}
      <AppContext.Provider
        value={{ options, popout, handleOptionChange, setPopout }}
      >
        <ToastProvider>{children}</ToastProvider>
      </AppContext.Provider>
      {/* )} */}
    </>
  );
}
