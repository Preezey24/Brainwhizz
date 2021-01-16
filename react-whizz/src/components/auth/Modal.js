import React, { useEffect } from 'react';
import './Auth.css';

const MODAL_STYLES = {
    position: 'fixed', 
    top: '50%', 
    left: '50%', 
    borderRadius: '5px',
    transform: 'translate(-50%, -50%)', 
    backgroundColor: 'rgb(96, 255, 255)', 
    zIndex: 1000,
    height: '430px',
    width: '300px'
}

const OVERLAY_STYLE = {
    position: 'fixed', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    zIndex: 1000, 
}

const Modal = ({open, onClose, children}) => {

    //make initial request on modal mount for csrf token
    useEffect(() => {
        const genCSRF = async () => {
            try {
                const response = await fetch('/auth/login');   
                if (response.ok) {
                    const data = await response.text();
                    console.log(data); 
                } 
            } catch (err) {
                console.log(err); 
            }
        }
        genCSRF(); 
    }, [])

    if (!open) return null;    
    
    return (
        <>
            <div style={OVERLAY_STYLE} />
            <div style={MODAL_STYLES}>
                {children}
                <button onClick={onClose} className={"button__home"}>Return</button>
            </div>
        </>
    )
}

export default Modal; 