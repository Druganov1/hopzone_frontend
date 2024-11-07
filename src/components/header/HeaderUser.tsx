import Link from 'next/link'
import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { IconType } from 'react-icons'
import { MdLogout, MdPerson } from 'react-icons/md'
import { useAuth } from 'src/providers/AuthProvider'

interface DropDownItemProps {
  Icon: IconType
  href: string
  title: string
  onClick?: React.MouseEventHandler<HTMLLIElement | undefined>
}

const DropDownItem: FunctionComponent<DropDownItemProps> = ({
  Icon,
  href,
  title,
  onClick,
}) => {
  return (
    <Link href={href}>
      <li
        className="p-4 border-blue-200 border-1 hover:cursor-pointer hover:bg-blue-100"
        onClick={onClick}
      >
        <div className="flex items-center gap-2 ">
          {<Icon size={24} className="text-purple-900 " />}
          <a className="text-purple-700 whitespace-nowrap">{title}</a>
        </div>
      </li>
    </Link>
  )
}

const UserDropDown = () => {
  const { logout } = useAuth()
  return (
    <div className="absolute right-0 z-50 w-48 bg-white border-2 border-orange-600 rounded-lg shadow top-10">
      <ul>
        <DropDownItem
          Icon={MdLogout}
          onClick={logout}
          title={'Sign Out'}
          href="/login"
        />
      </ul>
    </div>
  )
}

const HeaderUser = () => {
  const { user } = useAuth()
  const divRef = useRef<HTMLDivElement>(null)
  const [isOpen, setisOpen] = useState(false)

  const handleClickOutside = (e: MouseEvent) => {
    if (divRef.current?.contains(e.target as Node)) {
      return
    }
    setisOpen(false)
  }

  const handleOpenProfile = () => {
    setisOpen(!isOpen)
  }

  useEffect(() => {
    document.addEventListener('mouseup', handleClickOutside)

    return () => {
      document.removeEventListener('mouseup', handleClickOutside)
    }
  }, [])
  return (
    <div ref={divRef} className="relative flex items-center gap-4">
      <p className="">{user?.isAnonymous ? 'Guest' : user?.displayName}</p>
      <div
        onClick={handleOpenProfile}
        className="p-1 rounded-3xl hover:bg-theme-lightpurple hover:cursor-pointer"
      >
        <MdPerson size={24} />
      </div>
      {isOpen ? <UserDropDown /> : null}
    </div>
  )
}

export default HeaderUser
