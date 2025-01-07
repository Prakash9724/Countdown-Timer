import React, { forwardRef } from 'react'

const Cursor = forwardRef((props, ref) => {
  return (
    <div 
      id='cursor' 
      ref={ref} 
      className='h-8 w-8 rounded-full bg-white fixed pointer-events-none'
      style={{
        height: '14px',
        width: '14px',
        backgroundColor: 'white',
        mixBlendMode: 'difference',
        position: 'fixed',  
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        zIndex: 9999 // Ensure it's on top
      }}
    >
    </div>
  )
})

export default Cursor 
