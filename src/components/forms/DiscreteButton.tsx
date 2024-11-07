import React, { ButtonHTMLAttributes, FunctionComponent } from 'react'

const DiscreteButton: FunctionComponent<
  ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className, ...props }) => {
  return (
    <button
      className={`block bg-none text-theme-orange hover:text-orange-800 mb-4 font-semibold ${
        className ? className : ''
      }`}
      {...props}
    >
      {children}
    </button>
  )
}

export default DiscreteButton
