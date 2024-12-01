import Image from 'next/image'
import React from 'react'

type MenuLogoProps = {
  onClick(): void
}

export const MenuLogo = ({ onClick }: MenuLogoProps) => {
  return (
    <>
    <Image 
      onClick={onClick}
      src="/images/symbol.png"
      width={100}
      height={100}
      alt="logo"
      className='mt-4'
    />
    </>
  )
}
