/*
 *   File: App.ts 
 *
 *   Purpose: this file contains the parent of all components
 *
 */ 

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react'
import Home from './components/home'
import Greet from './components/greet'
import TestText from './components/testText'
import LoginPage from './components/login/login';
import RegisterPage from './components/register/register';
import ChangePassPage from './components/changepass/changepass';
import ProfilePage from './components/profile/profile';
import RemovePage from './components/profile/remove';
import LogoutPage from './components/profile/logout';

function App() {

  return (
    <BrowserRouter>
      <main>
          <Routes>
            {/* Routing */}
            <Route path="/" element={<Home />}/>
            <Route path="greet" element={<Greet />}/>
            <Route path="test" element={<TestText />}/>
            <Route path="profile" element={<ProfilePage/>}></Route>
            <Route path="profile/login" element={<LoginPage />}/>
            <Route path="profile/register" element={<RegisterPage/>}/>
            <Route path="profile/changepass" element={<ChangePassPage/>}/>
            <Route path="profile/remove" element={<RemovePage/>}/>
            <Route path="profile/logout" element={<LogoutPage/>}/>
            <Route path="*" element={<Home />}/>
          </Routes>
      </main>

    </BrowserRouter>
  );

}

export default App;

