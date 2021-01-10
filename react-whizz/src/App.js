import React from 'react';
import { Switch, Route } from 'react-router-dom'; 
import LoginForm from './components/auth/LoginForm'
import LogoutButton from './components/auth/LogoutButton';
import SignUpForm from './components/auth/SignUpForm'; 
import MathGame from './components/games/math/MathGame';
import MemoryGame from './components/games/memory/MemoryGame';
import SplashAuth from './components/splash/SplashAuth'; 
import NavBar from './components/navigation/NavBar'


function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path='/'>
          <SplashAuth/>
        </Route>
        <Route path='/math' component={MathGame} /> 
        <Route path='/memory' component={MemoryGame} /> 
      </Switch>
    </>
  );
}

export default App;
