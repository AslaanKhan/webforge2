"use client";
import { NotificationWithUser } from "@/lib/types";
import React, { createContext, useContext, useEffect } from "react";

interface ModalProviderProps {
  children: React.ReactNode;
}

type GlobalContextType = {
  isZoomEnabled: any | [];
  setZoomEnabled: ( isZoomEnabled : any, fetchData?: () => Promise<any>) => void;
};

export const GlobalContext = createContext<GlobalContextType | null>(null);

const GlobalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = React.useState<NotificationWithUser | []>([]);
  const [isMounted, setIsMounted] = React.useState(false);
  const [isZoomEnabled, setZoomEnabled] = React.useState(false);



  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <GlobalContext.Provider value={{ isZoomEnabled, setZoomEnabled }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within the modal provider");
  }
  return context;
};

export default GlobalProvider;
