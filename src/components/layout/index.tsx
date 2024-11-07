import { useRouter } from 'next/router'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { useAuth } from 'src/providers/AuthProvider'
import AppFooter from './AppFooter'
import AppHeader from './AppHeader'
import Image from 'next/image'

const PageLayout: FunctionComponent = ({ children }) => {
  return (
    <div className="h-screen">
      <AppHeader />
      <div className="max-w-7xl py-12 px-4 mx-auto h-fitscreen overflow-scroll">
        {children}
      </div>
      <AppFooter />
    </div>
  )
}

export default PageLayout
