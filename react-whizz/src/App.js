import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom'; 
import { useSelector } from 'react-redux'; 
import SplashAuth from './components/splash/SplashAuth'; 
import SplashUnAuth from './components/splash/SplashUnAuth'; 
import NavBar from './components/navigation/NavBar';
import MathGame from './components/games/math/MathGame';
import MemoryGame from './components/games/memory/MemoryGame';
import Drawing from './components/drawing/Drawing'; 
import Footer from './components/footer/Footer';
import './index.css'; 
import chalkboard from './images/chalkboard.jpg';
import math from './images/math-background.jpeg';
import draw from './images/draw_background.jpg'; 
import board from './images/draw_board.png';
import memory from './images/pastel-light-goo.jpg'

export const AuthContext = React.createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const history = useHistory(); 

  const user = useSelector(state => state.session.user); 
  useEffect(() => {
    if (user) {
      setIsAuthenticated(true); 
      history.push('/home'); 
    }
  }, [user]);

  return (
    <>
      <AuthContext.Provider value={setIsAuthenticated}>
        <NavBar />
      </AuthContext.Provider>
      <Switch>
        <Route exact path='/home'>
          {(isAuthenticated) 
          ? <SplashAuth/>
          : history.push('/')}
        </Route>
        <Route path='/math'>
          {(isAuthenticated)
            ? <MathGame />
          : history.push("/")}
        </Route>
        <Route path='/memory'>
        {(isAuthenticated) 
          ? <MemoryGame />
          : history.push("/")}
        </Route>
        <Route path='/drawing'>
          {(isAuthenticated)
            ? <Drawing />
            : history.push("/")}          
        </Route>
      </Switch>
        <SplashUnAuth />
      {!isAuthenticated && 
        <Footer /> 
      }
      <div id="preload">
        <img src={chalkboard}/>
        <img src={math}/>
        <img src={draw}/>
        <img src={board}/>
        <img src={memory}/>
      </div>
    </>
  );
}

export default App;
