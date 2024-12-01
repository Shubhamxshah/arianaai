import { SIDE_BAR_MENU } from '@/constants/menu'
import { MenuLogo } from '@/icons/menu-logo'
import React from 'react'
import MenuItem from './menu-item'
import DomainMenu from './domain-menu'
import { MonitorSmartphone } from 'lucide-react'

type Props = {
  onShrink(): void 
  current: string 
  domains: {
    id: string 
    name: string 
    icon: string | null 
  }[]
  | null 
  | undefined 
}

const MinMenu = ({onShrink, current, domains}: Props) => {
  return (
    <div className='p-3 flex flex-col items-center h-full'>
      <span className='animate-fade-in opacity-0 delay-300 fill-mode-forwards cursor-pointer'>
        <MenuLogo onClick={onShrink} />
      </span>
      <div className='animate-fade-in opacity-0 delay-300 fill-mode-forwards flex flex-col justify-between h-full pt-10'>
        <div className="flex flex-col">
          {SIDE_BAR_MENU.map((menu, key) => (
            <MenuItem
              size='min'
              {...menu}
            key={key}
            current={current}
          />
          ))}
          <DomainMenu 
            min 
            domains={domains}
          />
        </div>
        <div className='flex flex-col'>
          <MenuItem
            size='min'
            label="mobile app"
            icon={<MonitorSmartphone />}
          />
        </div>
      </div>
    </div>
  )
}

export default MinMenu
