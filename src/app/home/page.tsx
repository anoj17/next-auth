import { auth } from '@/auth'
import Image from 'next/image'
import React from 'react'
import { logoutBtn } from '../../../actions/login-with-providers'
import Logout from '../components/Logout'

const page = async() => {

  const session = await auth()
  return (
    <div className='bg-gray-400 flex justify-between items-center px-10'>
      home page{session?.user?.email}
      {/* <Image src={session?.user?.image || null} alt='logo' width={500} height={500} /> */}
      <Logout />
    </div>
  )
}

export default page
