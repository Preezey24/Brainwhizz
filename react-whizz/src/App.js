import React from 'react';
import { Route } from 'react-router-dom'; 
import LoginForm from './components/auth/LoginForm'
import SignUpForm from './components/auth/SignUpForm'


function App() {
  return (
    <>
      <Route path='/sign_up' component={SignUpForm} />
      <Route path='/login' component={LoginForm} />
    </>
  );
}

export default App;
