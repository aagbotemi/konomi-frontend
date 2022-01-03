import React from 'react'

const BaseButton = ({ onClick, text, className, disabled }) => {
    return <button disabled={disabled} className={className}
    onClick={onClick}>{text}</button>
}

export default BaseButton;