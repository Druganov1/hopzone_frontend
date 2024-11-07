import React, { FunctionComponent, HTMLAttributes } from 'react'

const PageTitle: FunctionComponent<HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
}) => {
  return (
    <h1 className={` text-5xl font-semibold text-theme-orange mb-8 ${className}`}>
      {children}
    </h1>
  )
}

export default PageTitle
