import Timer from './components/Timer'
import Cursor from './components/Cursor'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

const App = () => {

  const cursor = useRef(null);
  const onmouseenter = useRef(timerMotion());



  const handleMouseMove = (e) =>{
    gsap.to(cursor.current,{
      duration: 0.5,
      x: e.clientX,
      y: e.clientY
    })
  
  }

  const timerMotion = (e)=>{
    let x = onmouseenter.clientX;
    let y = onmouseenter.clientY;
    console.log(x,y);
    
  }
  
  return (
   <div onMouseMove={handleMouseMove}>
      <Cursor ref={cursor} />
      <Timer  ref={onmouseenter} />
   </div>
   
  )
}

export default App
