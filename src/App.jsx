import Timer from './components/Timer'
import Cursor from './components/Cursor'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { BackgroundBeamsWithCollision } from './components/ui/BackgroundBeamsWithCollision'

const App = () => {

  const cursor = useRef(null);
  


 

  const handleMouseMove = (e) =>{
    gsap.to(cursor.current,{
      duration: 0.5,
      x: e.clientX,
      y: e.clientY
    });
   
  }
  
  return (
   <div onMouseMove={handleMouseMove}>
      <Cursor ref={cursor} />
      <Timer  />
   </div>
   
  )
}

export default App
