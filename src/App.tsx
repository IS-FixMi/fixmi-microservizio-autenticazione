/*
 *   File: App.ts 
 *
 *   Purpose: this file contains the parent of all components
 *
 */ 

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react'
import LoginPage from './components/login/login';
import RegisterPage from './components/register/register';
import ChangePassPage from './components/changepass/changepass';
import ProfilePage from './components/profile/profile';
import RemovePage from './components/profile/remove';
import LogoutPage from './components/profile/logout';

function App() {

  return (
    <BrowserRouter basename='auth/'>
      <main>
          <Routes>
            {/* Routing */}
            <Route path="/" element={<ProfilePage />}/>
            <Route path="profile" element={<ProfilePage/>}></Route>
            <Route path="login" element={<LoginPage />}/>
            <Route path="register" element={<RegisterPage/>}/>
            <Route path="changepass" element={<ChangePassPage/>}/>
            <Route path="remove" element={<RemovePage/>}/>
            <Route path="logout" element={<LogoutPage/>}/>
            <Route path="*" element={<ProfilePage />}/>
          </Routes>
      </main>

    </BrowserRouter>
  );

}

export default App;

