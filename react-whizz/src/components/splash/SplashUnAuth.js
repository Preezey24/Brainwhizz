import React from 'react';
import './SplashUnAuth.css';
import koala from "../../images/koala.jpg";
import kangaroo from "../../images/kangaroo.jpg";



const SplashUnAuth = () => {
    return (
        <div className={"page_main"}>
            <div className={"koala_container"}>
                <img src={koala} />
            </div> 
            <div className={"kangaroo_container"}>
                <img src={kangaroo} />
            </div> 
        </div>
    )
}

export default SplashUnAuth; 