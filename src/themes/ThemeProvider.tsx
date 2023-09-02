'use client';

import { ThemeProvider } from '@mui/material/styles';
import React, { createContext, useEffect, useState, ReactNode } from 'react';

import { darkTheme, lightTheme } from './theme';

interface IThemeContext {
  theme: typeof lightTheme | typeof darkTheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContext>({
  theme: lightTheme,
  toggleTheme: () => {},
});

interface MyThemeProviderProps {
  children: ReactNode;
}

const MyThemeProvider: React.FC<MyThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<string>('light');

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('themeMode');
    if (storedTheme) {
      setThemeMode(storedTheme);
    }
  }, []);

  const currentTheme = themeMode === 'light' ? lightTheme : darkTheme;

  useEffect(() => {
    document.body.style.backgroundColor = currentTheme.palette.background.default;
  }, [currentTheme]);

  useEffect(() => {
    window.localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode(oldThemeMode => (oldThemeMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext, MyThemeProvider };
