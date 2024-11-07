import React, { FunctionComponent, HTMLAttributes } from 'react'

const SubTitle: FunctionComponent<HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
}) => {
  return (
    <h2 className={` text-3xl font-semibold text-orange-400 mb-8 ${className}`}>
      {children}
    </h2>
  )
}

export default SubTitle
