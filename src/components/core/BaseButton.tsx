import React from 'react'

interface IBaseButton {
    onClick?: any;
    text: string;
    className: string;
    disabled?: any;
    type?: any;
}

const BaseButton = ({ onClick, text, className, disabled, type }: IBaseButton) => {
    return <button type={type} disabled={disabled} className={className}
    onClick={onClick}>{text}</button>
}

export default BaseButton;