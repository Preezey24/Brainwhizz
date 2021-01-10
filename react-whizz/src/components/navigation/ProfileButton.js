import React, { useState, useEffect } from 'react'; 
import { useSelector } from 'react-redux'; 
import LogoutButton from '../auth/LogoutButton'
import './ProfileButton.css';

const ProfileButton = () => { 
   const [showMenu, setShowMenu] = useState(false); 
   const user = useSelector(state => state.session.user); 
   
   const openMenu = () => {
       if (showMenu) return; 
       setShowMenu(true); 
   };

   useEffect(() => {
       if (!showMenu) return; 

       const closeMenu = () => {
           setShowMenu(false); 
       }

       document.addEventListener('click', closeMenu); 

       return () => document.removeEventListener('click', closeMenu); 
   }, [showMenu]);

   return (
       <div>
           <button onClick={openMenu}>
               Open
           </button>
           {showMenu && (
               <ul>
                   <li>{user.username}</li>
                   <li>{user.email}</li>
                   <li>
                       <LogoutButton />
                   </li>
               </ul>
           )}
       </div>
   );
}

export default ProfileButton; 