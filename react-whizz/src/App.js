import React, { useState, useEffect, useContext } from 'react';
import { Switch, Route } from 'react-router-dom'; 
import { useSelector } from 'react-redux'; 
import SplashAuth from './components/splash/SplashAuth'; 
import NavBar from './components/navigation/NavBar';
import MathGame from './components/games/math/MathGame';
import MemoryGame from './components/games/memory/MemoryGame';

export const AuthContext = React.createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const user = useSelector(state => state.session.user); 
  useEffect(() => {
    if (user) {
      setIsAuthenticated(true); 
    }
  }, [user]);

  return (
    <>
      <AuthContext.Provider value={setIsAuthenticated}>
        <NavBar />
      </AuthContext.Provider>
      <Switch>
        <Route exact path='/'>
          {isAuthenticated &&
          <SplashAuth/>
          }
        </Route>
        <Route path='/math'>
          <MathGame />
        </Route>
        <Route path='/memory'>
          <MemoryGame />
        </Route>
      </Switch>
    </>
  );
}

export default App;
