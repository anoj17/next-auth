'use client'

import { Button } from '@/components/ui/button';
import React from 'react'
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { loginGithub, loginGoogle } from '../../../actions/login-with-providers';

const Social = () => {
  return (
    <div className='flex items-center w-full mt-5 space-x-2'>
      <Button variant='outline' onClick={()=> {loginGoogle('google')}} className='w-full rounded' size='lg'>
        <FaGoogle size={20}/>
      </Button>
      <Button variant='outline' onClick={()=> loginGithub('github')} className='w-full rounded' size='lg'>
        <FaGithub size={20}/>
      </Button>
    </div>
  )
}

export default Social
