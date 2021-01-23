import React from 'react';
import { GrLinkedin, GrGithub } from 'react-icons/gr';  
import { IconContext } from 'react-icons/lib';
import './Footer.css'; 

const Footer = () => {
    return (
        <div className={"footer_container"}>
            <div className={"footer_proj"}>
                <span className={"footer_proj"}>
                    <IconContext.Provider value={{className: "footer_icon_git"}}>
                        <GrGithub/>
                    </IconContext.Provider>
                    <a className={"footer_link"} href= 'https://github.com/Preezey24/Brainwhizz'>
                        Brainwhizz
                    </a>
                </span>
            </div>
            <div className={"footer_me"}>
                <span className={"footer_linked"}>
                    <span>
                        <IconContext.Provider value={{className: "footer_icon_linked"}}>
                            <GrLinkedin/>
                        </IconContext.Provider>
                    </span>
                    <a className={"footer_link"} href= 'https://www.linkedin.com/in/rhysprevite/'>
                        My LinkedIn
                    </a>
                </span>
                <span className={"footer_git"}>
                    <IconContext.Provider value={{className: "footer_icon_git"}}>
                        <GrGithub/>
                    </IconContext.Provider>
                    <a className={"footer_link"} href= 'https://github.com/Preezey24'>
                        My GitHub
                    </a>
                </span>
            </div>
        </div>
    )
} 

export default Footer; 