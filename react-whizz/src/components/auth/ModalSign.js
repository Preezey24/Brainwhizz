import React from 'react';
import './Auth.css';

const MODAL_STYLES = {
    position: 'fixed', 
    top: '50%', 
    left: '50%', 
    borderRadius: '5px',
    transform: 'translate(-50%, -50%)', 
    backgroundColor: 'rgb(96, 255, 255)', 
    zIndex: 1000,
    height: '540px',
    width: '360px'
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

const ModalSign = ({open, children}) => {
    if (!open) return null;    
    
    return (
        <>
            <div style={OVERLAY_STYLE} />
            <div style={MODAL_STYLES}>
                {children}
            </div>
        </>
    )
}

export default ModalSign; 