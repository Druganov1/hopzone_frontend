import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MdPerson } from 'react-icons/md'
import { Authenticated, NotAuthenticated } from 'src/providers/AuthProvider'
import Button from '../forms/Button'
import HeaderUser from '../header/HeaderUser'

const AppHeader = () => {
  return (
    <nav className="bg-gradient-to-r from-theme-lightpurple to-theme-orange ">
      <div className="flex justify-between px-4 py-4 mx-auto max-w-7xl">
        <Link href={'/'}>
          <a className="flex items-center gap-2">
            <Image src={'/img/head_orange.png'} width={32} height={32} />
            <span>BirbieUp</span>
          </a>
        </Link>

        <Authenticated>
          <HeaderUser />
        </Authenticated>
      </div>
    </nav>
  )
}

export default AppHeader
