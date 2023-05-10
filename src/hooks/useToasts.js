import React from "react";
import { createContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const ToastsContext = createContext(null);

export default function ToastsProvider({ children }) {
  const errorNotify = (msg) => toast.error(msg);
  const successNotify = msg => toast.success(msg);
  const infoNotify = msg => toast.info(msg);

  return (
    <ToastsContext.Provider value={{ errorNotify, successNotify, infoNotify }}>
      {children}
      <ToastContainer />
    </ToastsContext.Provider>
  );
}
