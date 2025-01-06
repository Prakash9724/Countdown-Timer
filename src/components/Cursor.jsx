import React, { useState ,forwardRef } from 'react'

const Cursor = forwardRef((props,ref) => {
  return (
    <div id='cursor' ref={ref} className='h-4 w-4 rounded-full bg-black fixed'>
        
    </div>
  )
})

export default Cursor 
