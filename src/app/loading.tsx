import React from 'react'

export default function loading() {
  return (
   <>
      <div className="flex items-center justify-center min-h-screen  flex-col ">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 ">
       
      </div>
       <p>Loading...</p>
    </div>
    </>
  )
}
