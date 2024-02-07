import React from 'react'
import Header from './components/Header/Header';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Login from './components/Login/Login';

const App = () => {
  return (
    <Router>
      <Header/>
            <Routes>
                <Route exact path="/" element={<Login/>} />
            </Routes>
    </Router>
  );
}

export default App
