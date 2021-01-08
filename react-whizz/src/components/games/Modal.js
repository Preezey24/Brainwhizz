import React, {useState} from 'react'; 

const Modal = ({open}) => {
    if (!open) return null; 

    return (
        <div>
            <span>Looooose</span>
        </div>
    )
}

export default Modal; 