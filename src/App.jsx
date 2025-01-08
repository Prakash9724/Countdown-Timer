import React, { useRef } from 'react'
import Timer from './components/Timer'
import Cursor from './components/Cursor'
import gsap from 'gsap'

const App = () => {
  const cursor = useRef(null);

  const handleMouseMove = (e) => {
    
    
    gsap.to(cursor.current, {
      duration: 0.5,
      x: e.clientX,
      y: e.clientY
    });
  }
  
  return (
   <div onMouseMove={handleMouseMove} style={{ height: '100vh', overflow: 'hidden' }} >
      <Cursor ref={cursor} />
      <Timer />
      
   </div>
  )
}

export default App
