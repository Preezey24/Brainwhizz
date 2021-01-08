import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'; 
import LoginForm from './components/auth/LoginForm'
import LogoutButton from './components/auth/LogoutButton';
import SignUpForm from './components/auth/SignUpForm'; 
import MathGame from './components/games/math/MathGame';
import MemoryGame from './components/games/memory/MemoryGame';


function App() {
  return (
    <BrowserRouter>
      <Route path='/signup' component={SignUpForm} />
      <Route path='/login' component={LoginForm} />
      <Route path='/logout' component={LogoutButton} />
      <Route path='/math' component={MathGame} /> 
      <Route path='/memory' component={MemoryGame} /> 
    </BrowserRouter>
  );
}

export default App;
