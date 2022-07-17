import React, {  createContext, FC, ReactNode, useCallback, useEffect, useState } from 'react';

type WindowProps = {
  windowWidth: number,
  windowHeight: number,
  children? : ReactNode
};

export const WindowContext = createContext<WindowProps>({windowWidth: 0, windowHeight: 0});

const WindowContextProvider: FC<WindowProps> = ({ children }) => {

const getVh = useCallback(() => {
  return Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );
}, []);
const getVw = useCallback(() => {
  return Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
}, []);

const [windowHeight, setWindowHeight] = useState<number>(getVh());
const [windowWidth, setWindowWidth] = useState<number>(getVw());


useEffect(() => {

  const resizeWindow = () => {
    setWindowHeight(getVh());
    setWindowWidth(getVw());
  }

  window.addEventListener('resize', resizeWindow);
  return () => { window.removeEventListener('resize', () => resizeWindow())}
}, [getVw, getVh]);

  return (
          <WindowContext.Provider value={{windowWidth, windowHeight}}>
          { children }
          </WindowContext.Provider>
        )

  
};

export default WindowContextProvider;
