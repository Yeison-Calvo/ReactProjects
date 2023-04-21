import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Square } from './components/Square.jsx'
import {turns} from './components/constant.js'
import { WinnerModal } from './components/WinnerModal'
import { checkWinner, checkEndGame } from './logic/board'
// npm run dev para iniciar el proyecto 



function App() {
    const [board, setBoard] = useState(() =>{
        const boardFromStorage = window.localStorage.getItem('board')  
        return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
    })
    
    const [turn, setTurn] = useState(() =>{
        const newTurn = window.localStorage.getItem('turn')
        return newTurn ? JSON.parse(newTurn) : turns.X
    })

    const [winner, setWinner] = useState(null) // null es que no hay ganador, false es que hay un empate




    const resetGame = () => {
        setBoard(Array(9).fill(null))
        setTurn(turns.X)
        setWinner(null)
        window.localStorage.removeItem('board')
        window.localStorage.removeItem('turn')
    }




    const updateBoard = (index) => {
        if(board[index] || winner) return // no actualiza si ya tenemos asignado un valor en el indice 

        const newBoard = [...board] // NO se cambia directamente el board, se crea un clon

        newBoard[index] = turn // se altera el clon

        setBoard(newBoard) // se agrega el nuevo valor al estado

        const newTurn = turn === turns.X ? turns.O : turns.X

        setTurn(newTurn)
        ///guardar partida

        window.localStorage.setItem('board', JSON.stringify(newBoard))
        window.localStorage.setItem('turn', JSON.stringify(newTurn))

        /// ahora vamos a revisar si tenemos un ganador
        const newWinner = checkWinner(newBoard) // le pasamos newBoard y no board porque setBoard es asincrono, y tendriamos un error si le pasamos board
        if(newWinner){
            confetti()
            setWinner(newWinner) // la actualizacion del estado es asincrona por lo que si hago un console.log(winner) veria null
        }else if(checkEndGame(newBoard)){
            setWinner(false) // empate
        }
    }




    return (
    <main className='board'>
        <h1>Tic Tac Toe</h1>
        <button onClick={resetGame}>Reiniciar</button>
        <section className='game'>
            {
                board.map((square, index) => {
                    return (
                        //  importante, por qué no se pasa updateBoard(), si se pasa con los parentesis
                        // significa que se le esta pasando la ejecucion de la funcion, no la funcion como parametro
                        // si se le pasa la ejecucion de la funcion, esta se hace cada vez que renderiza
                        // al pasarse como parametro se puede manejar cuando se ejecutaº
                        <Square key = {index}index = {index} updateBoard={updateBoard}> 
                            {square}
                        </Square>
                        
                    )
                })
            }
        </section>
        
        <section className='turn'>
            <Square isSelected={turn === turns.X}>{turns.X}</Square>
            <Square isSelected={turn === turns.O}>{turns.O}</Square>
        </section>

        <WinnerModal winner={winner} resetGame={resetGame}/>
        
    </main>
    )
}

export default App
