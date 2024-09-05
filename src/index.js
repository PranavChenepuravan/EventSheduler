import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PeopleHome from './People/PeopleHome';
import Landing from './Landing';
import Register from './Register';
import AdminHome from './Admin/Adminhome';
import Login from './Login';
import Session from './People/Session';
import Shedule from './Admin/Shedule';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
       <Route path='/' element={<Landing/>}>
         <Route path='register' element={<Register/>}/>
         <Route path='login' element={<Login/>}/>
       </Route>
       <Route path='/adminhome' element={<AdminHome/>}>
         <Route path='shedule' element={<Shedule/>}/>
       </Route>
       <Route path='/peoplehome' element={<PeopleHome/>}>
         <Route path='session' element={<Session/>}/>
       </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
