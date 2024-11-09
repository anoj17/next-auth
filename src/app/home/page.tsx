import { auth } from '@/auth'
import Image from 'next/image'
import React from 'react'

const page = async() => {

  const session = await auth()
  return (
    <div className='bg-gray-400'>
      home page{session?.user?.email}
      {/* <Image src={session?.user?.image || null} alt='logo' width={500} height={500} /> */}
    </div>
  )
}

export default page
