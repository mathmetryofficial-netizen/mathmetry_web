'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import Loader from './Loader';

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  showLoader: () => void;
  hideLoader: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading, showLoader, hideLoader }}>
      {children}
      {isLoading && (
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-[2px] z-50 flex items-center justify-center transition-all duration-150">
          <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center gap-3 border border-slate-100">
            <Loader size="md" />
            <p className="text-slate-600 text-sm font-medium">Please wait...</p>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
};