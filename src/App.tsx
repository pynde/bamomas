import React, { createContext, useCallback, useEffect, useState } from 'react';
import './App.scss';
import Nav from './components/Nav/Nav';
import MainPage from './components/MainPage/MainPage';
import WindowContextProvider from './components/context/WindowContextProvider';
import { Routes } from 'react-router-dom';






function App() {




  return (
          <WindowContextProvider windowHeight={0} windowWidth={0}>
          <div className='App'>
            <Nav/>
              <MainPage/>
          </div>
          </WindowContextProvider>
  );
}

export default App;
