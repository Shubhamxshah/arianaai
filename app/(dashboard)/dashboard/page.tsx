import SignoutComponent from '@/components/auth/signout'
import React from 'react'

type Props = {}

const Dashboard = (props: Props) => {
  return (
    <div>Dashboard
      <SignoutComponent />
    </div>
  )
}

export default Dashboard
