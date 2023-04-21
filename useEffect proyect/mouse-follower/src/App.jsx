import { useEffect, useState } from "react"
import confetti from 'canvas-confetti'



function App() {

  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({x: 0, y: 0})
  const [target, setTarget] = useState({x: 70, y:710})



  useEffect(()=>{
    console.log('efecto', enabled)
    const handleMove = (event) => {
      const {clientX, clientY} = event
      //console.log('handleMove', {clientX, clientY})
      setPosition({x: clientX, y:clientY})
    }
    if(enabled){
      window.addEventListener('pointermove', handleMove)
    }

    return () => {
      window.removeEventListener('pointermove', handleMove)
    } // esto se ejectua cuando termina el efecto, puedo revisar cuantos eventos subscritos hay con getEventListeners(window)
  }, [enabled])

  useEffect(() => {
    //console.log('contacto')
    if(target.x === position.x  && target.x === position.x){
      confetti()
      let newTargetX = Math.floor(Math.random()*700)
      let newTargetY = Math.floor(Math.random()*700)
      setTarget({x:newTargetX, y:newTargetY})
    }
  }, [position.x, position.y])

return (
    <main>
      <div style={{
        position: 'absolute',
        backgroundColor: '#09f',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px,${position.y}px)`
      }}>
      </div>
      <button onClick={() => setEnabled(!enabled)}> 
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
      <div style={{position: 'absolute', top: `${target.y}px`, left: `${target.x}px`, backgroundColor: 'red', width: 20,
        height: 20}}>
      </div>
      
      
    </main>
)
}

export default App
