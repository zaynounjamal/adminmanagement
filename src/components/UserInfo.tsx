import React from 'react'
import {Info} from '../type'
type UserInfoProps={
    user:Info
}
const UserInfo = ({user}:UserInfoProps) => {
  return (
    <div>
        <h1>User Info</h1>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>ID: {user.id}</p>
    </div>
  )
}

export default UserInfo