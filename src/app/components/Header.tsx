import React from 'react'

const Header = ({ label }: { label: string }) => {
    return (
        <div className='flex space-x-2 items-center pb-5'>
            <h1 className=" font-bold text-3xl w-full text-center text-black drop-shadow-md">
                <span className="text-3xl ">🔐</span>
                {label}
            </h1>
        </div>
    )
}

export default Header
