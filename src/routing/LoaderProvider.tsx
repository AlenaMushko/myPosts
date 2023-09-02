'use client';
import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

type LoaderContextType = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

type LoaderProviderProps = {
  children: ReactNode;
};

export const LoaderContext = createContext<LoaderContextType>({
  isLoading: false,
  setIsLoading: () => {},
});

export const LoaderProvider: React.FC<LoaderProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>{children}</LoaderContext.Provider>
  );
};
