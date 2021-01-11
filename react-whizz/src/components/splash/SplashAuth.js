import React, {useEffect} from 'react'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { NavLink, Route } from 'react-router-dom';
import MathGame from '../games/math/MathGame';
import MemoryGame from '../games/memory/MemoryGame';
import './SplashAuth.css'; 
import { setUser } from '../../store/reducers/session';


const SplashAuth = () => {
    //update the user store
    // const dispatch = useDispatch(); 
    // const user = useSelector(state => state.session.user)
    // useEffect(() => {
    //     const updateUser = async () => {
    //         try {
    //             const response = await fetch('/home', {
    //                 method: 'POST', 
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify({
    //                     user, 
    //                 })
    //             });
    //             if (response.ok) {
    //                 const data = await response.json(); 
    //                 dispatch(setUser(data)); 
    //             }
    //         } catch (err) {
    //             console.log(err); 
    //         }
    //     }
    //     updateUser(); 
    // }, []);

    return (
        <>  
            <div>
                <NavLink to='/math'>Math Game</NavLink>
                <NavLink to='/memory'>Memory Game</NavLink> 
            </div>
            <Route path='/math' component={MathGame} /> 
            <Route path='/memory' component={MemoryGame} />
        </>
    )
}

export default SplashAuth; 