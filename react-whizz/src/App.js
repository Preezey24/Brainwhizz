import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'; 
import LoginForm from './components/auth/LoginForm'
import LogoutButton from './components/auth/LogoutButton';
import SignUpForm from './components/auth/SignUpForm'; 
import MathGame from './components/games/MathGame';


function App() {
  return (
    <BrowserRouter>
      <Route path='/signup' component={SignUpForm} />
      <Route path='/login' component={LoginForm} />
      <Route path='/logout' component={LogoutButton} />
      <Route path='/math' component={MathGame} /> 
    </BrowserRouter>
  );
}

export default App;
