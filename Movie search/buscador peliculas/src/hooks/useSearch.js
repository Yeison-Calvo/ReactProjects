import { useState, useRef, useEffect } from "react"

export function useSearch(){
    const [query, setQuery] = useState('')
    const [error, setError] = useState(null)
    const isFirstInput = useRef(true)
  
    
    //comprobar las validaciones con un useEffect
    useEffect(() =>{
      if(isFirstInput){
        isFirstInput.current = query === ''
        return
      }
  
  
      if(query === ''){
        setError('No se puede realizar una busqueda vacía')
        return
      }
      
      if(query.length < 3){
        setError('Necesita al menos 3 caracteres')
        return
      }
  
      setError(null)
    }, [query])
    return {query, setQuery, error}
  }