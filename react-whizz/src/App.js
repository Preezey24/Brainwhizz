import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'; 
import LoginForm from './components/auth/LoginForm'
import SignUpForm from './components/auth/SignUpForm'


function App() {
  return (
    <BrowserRouter>
      <Route path='/sign_up' component={SignUpForm} />
      <Route path='/login' component={LoginForm} />
    </BrowserRouter>
  );
}

export default App;
