import { useState } from "react";
import Square from "./Square";

export default function Board() {
  const [square, setSquare] = useState(Array(9).fill(null));
  const [isXNext, setisXNext] = useState(true);

  function handlerClick(i) {
    if (square[i] || decideWinner(square)) {
      return;
    }
    const nextSquare = square.slice();
    if (isXNext) {
      nextSquare[i] = "X";
    } else if (!isXNext) {
      nextSquare[i] = "O";
    }
    setSquare(nextSquare);
    setisXNext(!isXNext);
  }

  function decideWinner(square) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (square[a] && square[a] === square[b] && square[a] === square[c]) {
        return square[a];
      }
    }
    return null;
  }

  const winner = decideWinner(square);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (isXNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}
        <div className="board-row">
            <Square value={square[0]} onSquareClick={() => handlerClick(0)} />
            <Square value={square[1]} onSquareClick={() => handlerClick(1)} />
            <Square value={square[2]} onSquareClick={() => handlerClick(2)} />
        </div>
        <div className="board-row">
            <Square value={square[3]} onSquareClick={() => handlerClick(3)} />
            <Square value={square[4]} onSquareClick={() => handlerClick(4)} />
            <Square value={square[5]} onSquareClick={() => handlerClick(5)} />
        </div>
        <div className="board-row">
            <Square value={square[6]} onSquareClick={() => handlerClick(6)} />
            <Square value={square[7]} onSquareClick={() => handlerClick(7)} />
            <Square value={square[8]} onSquareClick={() => handlerClick(8)} />
        </div>
    </div>
    </>
  );
}
