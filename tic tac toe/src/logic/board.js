import { WINNER_COMBOS } from "../components/constant"

export     const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
}

export     const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS){
        const [a,b,c] = combo
        // se utiliza el parametro boardToCheck y no board, porque si no tendriamos un error ya que board es asincrona
        if(boardToCheck[a] && boardToCheck[a] == boardToCheck[b] && boardToCheck[c] == boardToCheck[b]){
            return boardToCheck[a] // esto nos va a devolver x u o, el cual seria el ganador
        }
    }
    return null // si no se cumple en ningun momento entonces no tenemos un ganador
}