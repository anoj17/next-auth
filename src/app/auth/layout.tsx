import React from 'react'
import { Toaster } from 'react-hot-toast';

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='h-full w-full flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-blue-800'>
      {children}
      <Toaster />
    </div>
  )
}

export default layout
