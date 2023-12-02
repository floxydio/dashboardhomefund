import React from 'react'

export default function ResetDevUrPage() {

    localStorage.removeItem("apiPrefix")
  return (
    <div>Reset token successfully</div>
  )
}
