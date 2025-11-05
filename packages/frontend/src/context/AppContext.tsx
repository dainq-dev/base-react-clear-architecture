import React, { createContext, useContext } from 'react';
import type { AppContext } from '../types/context';

interface AppContextValue {
  context: AppContext;
}

const AppContextReact = createContext<AppContextValue | null>(null);

/**
 * AppProvider provides the application context to all child components
 */
export function AppProvider({
  children,
  context,
}: {
  children: React.ReactNode;
  context: AppContext;
}) {
  return (
    <AppContextReact.Provider value={{ context }}>
      {children}
    </AppContextReact.Provider>
  );
}

/**
 * Hook to access the application context
 * @throws {Error} If used outside AppProvider
 */
export function useAppContext(): AppContextValue {
  const contextValue = useContext(AppContextReact);
  if (!contextValue) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return contextValue;
}

/**
 * Convenience hook to get Jet instance from context
 */
export function useJet() {
  const { context } = useAppContext();
  return context.jet;
}

