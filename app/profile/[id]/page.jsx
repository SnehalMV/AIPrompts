'use client'

import Profile from '@components/Profile'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const UserAccount = ({ params }) => {
  const [userPosts, setUserPosts] = useState([])
  const searchParams = useSearchParams()
  const name = searchParams.get('name')

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/user/${params?.id}/posts`)
      const data = await response.json()
      
      setUserPosts(data)
    }

    fetchUser()
  }, [])

  return (
    <Profile name={name+"'s"} data={userPosts} desc={`Welcome to ${name}'s personalized profile page. Explore ${name}'s exceptional prompts and be inspired by the power of their imagination`} />
  )
}

export default UserAccount