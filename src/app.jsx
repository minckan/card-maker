import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styles from './app.module.css';
import Maker from './Components/maker/maker';
import Login from './Components/login/login';

function App({ authService }) {
  return (
      <div className={styles.app}>
          <BrowserRouter>
            <Routes>
                  <Route path='/' element={<Login authService={authService} />}></Route>
                  <Route path='/maker' element={<Maker  authService={authService}/>}></Route>
            </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
