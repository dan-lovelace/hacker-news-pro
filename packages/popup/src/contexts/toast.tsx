import { createContext, ReactNode, useContext, useState } from "react";

import { Alert, Snackbar } from "@mui/material";

type ToastContextState = {
  notify: (message: string) => void;
};

const ToastContext = createContext({} as ToastContextState);

export function useToastContext() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);

  const handleClose = () => {
    setMessage(null);
  };

  const notify = (newMessage: string) => {
    setMessage(newMessage);
  };

  return (
    <ToastContext.Provider value={{ notify }}>
      <Snackbar
        open={Boolean(message)}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        ClickAwayListenerProps={{
          mouseEvent: "onMouseDown",
        }}
      >
        <Alert severity="error" onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
      {children}
    </ToastContext.Provider>
  );
}
