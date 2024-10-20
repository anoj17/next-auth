import { Button } from '@/components/ui/button';
import React from 'react'
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";

const Social = () => {
  return (
    <div className='flex items-center w-full mt-5 space-x-2'>
      <Button variant='outline' className='w-full rounded' size='lg'>
        <FaGoogle size={20}/>
      </Button>
      <Button variant='outline' className='w-full rounded' size='lg'>
        <FaGithub size={20}/>
      </Button>
      <Button variant='outline' className='w-full rounded' size='lg'>
        <FaFacebookF size={20}/>
      </Button>
    </div>
  )
}

export default Social
