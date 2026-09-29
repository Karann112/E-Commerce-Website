import React from 'react'

function Button({children , onClick , className}) {
  return (
    <button onClick={onClick} className={`px-3 py-2 border shadow-md font-semibold rounded-lg text-sm ${className}`} >{children}</button>
  )
}

export default Button