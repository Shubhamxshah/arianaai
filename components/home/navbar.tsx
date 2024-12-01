import React from 'react'
import SigninComponent from '../auth/signin'
import Image from 'next/image'

const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-around align-baseline pt-3 pl-3">
      <Image 
        src="/images/arianalogo.png"
        alt="LOGO"
        width={0}
        height={0}
        style={{
        width: "200px",
        height: "auto"
        }}
        sizes="100vw"
      />
        <div className=' hidden md:block pt-3'>
          <a className="text-gray-400 hover:text-gray-700" href="#">Products</a>
          <a className="text-gray-400 ml-5 hover:text-gray-700" href="#">Explore</a>
          <a className="text-gray-400 ml-5 hover:text-gray-700" href="#">Careers</a>
          <a className="text-gray-400 ml-5 hover:text-gray-700" href="#">FAQ</a>
          <a className="text-gray-400 ml-5 hover:text-gray-700" href="#">Contact</a>
        </div>
        <div className='pt-1'>
        <SigninComponent />
        </div>
      </nav>

    </div>
  )
}

export default Navbar
