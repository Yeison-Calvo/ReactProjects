import { useEffect, useState } from 'react'
import './App.css'
import { EVENTS } from './assets/const'


function navigate(href){
  window.history.pushState({}, '', href)
  // crear un evento personalziado
  const navigationEvent = new Event(EVENTS.PUSHSTATE)
  window.dispatchEvent(navigationEvent)
}


function HomePage(){
  return(
    <>
      <h1>Home</h1>
      <p>Esta es una página de ejemplo para crear un react router desde cero</p>
      <button onClick={() => navigate('/about')}>Ir a sobre nosotros</button>
    </>
  )
}

function AboutPage(){
  return(
    <>
      <h1>About</h1>
      <p>Hola me llamo Yeison Calvo y estoy creando un clon de React Router</p>
      <button onClick={() => navigate('/')}>Ir a home</button>
    </>
  )
}


function App() {

  const [currentPath,  setCurrentPath] = useState(window.location.pathname)


  useEffect(() =>{
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange) // escucha el evento hacia adelante
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  },[])


  return (
    <main>
      {currentPath === '/' && <HomePage/>}
      {currentPath === '/about' && <AboutPage/>}
    </main>
  )
}

export default App
