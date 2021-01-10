import React, { useState, useEffect } from 'react'; 
import { useDispatch } from 'react-redux'; 
import './ProfileButton.css';

const ProfileButton = () => { 
   const [showMenu, setShowMenu] = useState(false); 
   
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
                   <li>Username</li>
                   <li>Email</li>
                   <li>
                       <button>Log Out</button>
                   </li>
               </ul>
           )}
       </div>
   );
}

export default ProfileButton; 