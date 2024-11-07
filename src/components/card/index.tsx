import React, { FunctionComponent } from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

const Card: FunctionComponent<CardProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={` bg-purple-800 rounded-lg shadow ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
