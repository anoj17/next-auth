'use client'

import React from 'react'
import { logoutBtn } from '../../../actions/login-with-providers'

const Logout = () => {
  return (
    <div className='py-1'>
      <button className='bg-blue-500 text-white px-5 py-3 rounded-md' onClick={()=>logoutBtn()}>logout</button>
    </div>
  )
}

export default Logout
