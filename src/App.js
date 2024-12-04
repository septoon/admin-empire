import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';


import Main from './components/Main/Main';
import Services from './components/Services/Services';
import Contacts from './components/Contacts/Contacts';
import AvailableTimes from './components/AvailableTimes/AvailableTimes';
import Posts from './components/Posts/Posts';
import Available from './components/Available/Available';

function App() {
  
  return (
    <div
      className="p-2 w-full h-full flex flex-col justify-start items-center bg-gray-100 min-h-screen overflow-hidden"
    >
      <ToastContainer />
      <Routes>
        <Route exact path="/admin-empire" element={<Main />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/available-times" element={<AvailableTimes />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/available" element={<Available />} />
      </Routes>
    </div>
  );
}

export default App;