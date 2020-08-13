import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Bking from '/Users/roy/VS Code/Chess/react-chess/src/Bking.png'
import Bqueen from '/Users/roy/VS Code/Chess/react-chess/src/Bqueen.png'
import Bbishop from '/Users/roy/VS Code/Chess/react-chess/src/Bbishop.png'
import Brook from '/Users/roy/VS Code/Chess/react-chess/src/Brook.png'
import Bknight from '/Users/roy/VS Code/Chess/react-chess/src/Bknight.png'
import Bpawn from '/Users/roy/VS Code/Chess/react-chess/src/Bpawn.png'
import Wpawn from '/Users/roy/VS Code/Chess/react-chess/src/Wpawn.png'
import Wking from '/Users/roy/VS Code/Chess/react-chess/src/Wking.png'
import Wqueen from '/Users/roy/VS Code/Chess/react-chess/src/Wqueen.png'
import Wbishop from '/Users/roy/VS Code/Chess/react-chess/src/Wbishop.png'
import Wrook from '/Users/roy/VS Code/Chess/react-chess/src/Wrook.png'
import Wknight from '/Users/roy/VS Code/Chess/react-chess/src/Wknight.png'

const Square = props => {
    return (
        <button
            className = "square"
            style = {{background: props.blackBG ? 'darkgreen' : 'white'}}
            onClick={props.onClick}
        >
          
            {props.value}
        </button>
    )
}
  
const Board = props => {

    const fillBlack = i => { //loop for the background of each square
      const black = []

      for (let x = 0; x < 8; x++){

        for (let y = 0; y < 8; y++){

          if(x%2===0 && y%2 !== 0){
            black.push(true)
          }else if(x%2!==0 && y%2 ===0){
            black.push(true)
          }else{
            black.push(false)
          }
        }
      }
      return black[i];
    }

    const checkValue = name => {
      return name === "Bking" 
      ? <img src={Bking} alt = '' className={'king'}/>
      : name === "Bpawn"
      ? <img src={Bpawn} alt = '' className={'pawn'}/>
      : name === "Bqueen"
      ? <img src={Bqueen} alt = '' className={'Bpiece'}/>
      : name === "Bknight"
      ? <img src={Bknight} alt = '' className={'Bpiece'}/>
      : name === "Brook1" || name === "Brook2"
      ? <img src={Brook} alt = '' className={'Bpiece'}/>
      : name === "Bbishop"
      ? <img src={Bbishop} alt = '' className={'Bpiece'}/>
      : name === "Wking" 
      ? <img src={Wking} alt = '' className={'king'}/>
      : name === "Wpawn"
      ? <img src={Wpawn} alt = '' className={'pawn'}/>
      : name === "Wqueen"
      ? <img src={Wqueen} alt = '' className={'Bpiece'}/>
      : name === "Wknight"
      ? <img src={Wknight} alt = '' className={'Bpiece'}/>
      : name === "Wrook1" || name === "Wrook2"
      ? <img src={Wrook} alt = '' className={'Bpiece'}/>
      : name === "Wbishop"
      ? <img src={Wbishop} alt = '' className={'Bpiece'}/>
      : null

    }


    const renderSquare = i => {

      const col = i % 8;
      const row = Math.floor(i/8) 
     
      return (
        <Square 
            blackBG = {fillBlack(i)}
            value={checkValue(props.squares[col][row])}
            onClick={() => props.onClick(i)}
            
        />
      );
    }
  
    
    const outer = []

    for(let x = 0; x < 8; x++){ //loop for setting up the board :D

      let inner = []

      for(let y = 0; y < 8; y++){
        inner.push(renderSquare(x*8 + y))
      }

      outer.push(<div className='board-row'>{inner}</div>)
    }
  
  return (
    <div>
      {outer}
    </div>
  );
    
}

  //==================================================

const MoveList = props => {

  const moves = props.history.map((step,move) => {
        
    const desc = move ?
      `(${step.moveCord}) Go to move #${move}` :
      'Go to game start';

    return (
            <li key={move}>
                <button
                  style={{'fontWeight': props.stepNumber === move ? 'bold' : 'normal'}} 
                  onClick={() => props.onClick(move)}
                >
                  {desc}
                </button>
            </li>
      );
  });
    
  return props.listDescend ? moves : moves.reverse();
  
}

//===============================================
const Game = () => {
  const [history, updateHistory] = useState([{
    squares : (() => {
      let chessBoard = []

      for (let x = 0; x < 8; x++){
        chessBoard.push(Array(8).fill(null));
      }

      for (let x = 0; x < 8; x++){
        
        chessBoard[x][1] = "Bpawn"
        chessBoard[x][6] = "Wpawn"
        
      }

      chessBoard[0][0] = "Brook1"
      chessBoard[7][0] = "Brook2"
      
      chessBoard[1][0] = "Bknight"
      chessBoard[6][0] = "Bknight"

      chessBoard[2][0] = "Bbishop"
      chessBoard[5][0] = "Bbishop"

      chessBoard[3][0] = "Bqueen"
      chessBoard[4][0] = "Bking"

      chessBoard[0][7] = "Wrook1"
      chessBoard[7][7] = "Wrook2"

      chessBoard[1][7] = "Wknight"
      chessBoard[6][7] = "Wknight"

      chessBoard[2][7] = "Wbishop"
      chessBoard[5][7] = "Wbishop"

      chessBoard[3][7] = "Wqueen"
      chessBoard[4][7] = "Wking"


      return chessBoard;
      
    })(),
    moveCord : null,
    didKingMove : {'Bking': false, 'Wking': false},
    didRookMove: {'Brook1': false, 'Brook2': false, 'Wrook1': false, 'Wrook2': false},
  }])

  const [stepNumber, updateStepNumber] = useState(0)
  const [bIsNext, updateBIsNext] = useState(false)
  const [listDescend, updateListDescend] = useState(true)
  const [clicked, updateClicked] = useState(null)
  const [pos, updatePos] = useState({col: null, row: null})
  const [didKingMove, updateDidKingMove] = useState({'Bking': false, 'Wking': false})
  const [didRookMove, updateDidRookMove] = useState({'Brook1': false, 'Brook2': false, 'Wrook1': false, 'Wrook2': false})
  
  

  const handleClick = i => {
    // this is for the movelist section
    const tempHistory = history.slice(0, stepNumber + 1); 
    const current = tempHistory[tempHistory.length - 1];
    let squares = []

    // to keep the array immutable 
    for (let x = 0; x < 8; x++){
      const arr = current.squares[x].slice();

      squares.push(arr)

    }
    
    // current location
    const col = i % 8;
    const row = Math.floor(i/8) 
    let loc = squares[col][row]

    // this is to check if it is the first click
    if(clicked === null && loc === null){
      return;
    }else{

      //when it's black's turn
      if(bIsNext){

        //requirements for castle
        if(clicked === 'Bking' && !didKingMove.Bking && (loc === 'Brook1'|| loc === 'Brook2')){

          squares = castle(col,row,squares)

        }else{
          updateClicked(loc === 'Bpawn'
          ? 'Bpawn'
          : loc === 'Bbishop'
          ? 'Bbishop'
          : loc === 'Bking'
          ? 'Bking'
          : loc === 'Bqueen'
          ? 'Bqueen'
          : loc === 'Brook1' 
          ? 'Brook1'
          : loc === 'Brook2'
          ? 'Brook2'
          : loc === 'Bknight'
          ? 'Bknight'
          : clicked)

          if(loc === 'Bpawn'
          || loc === 'Bking'
          || loc === 'Bqueen'
          || loc === 'Bknight'
          || loc === 'Brook1'
          || loc === 'Brook2'
          || loc === 'Bbishop'
          ){
            updatePos({col: col, row: row})
            return
          }
        }

      //when it's white's turn
      }else{

        //requirements for castle
        if(clicked === 'Wking' && !didKingMove.Wking && (loc === 'Wrook1'|| loc === 'Wrook2')){

          squares = castle(col,row,squares)

        }else{

          updateClicked(loc === 'Wpawn'
          ? 'Wpawn'
          : loc === 'Wbishop'
          ? 'Wbishop'
          : loc === 'Wking'
          ? 'Wking'
          : loc === 'Wqueen'
          ? 'Wqueen'
          : loc === 'Wrook1' 
          ? 'Wrook1'
          : loc === 'Wrook2'
          ? 'Wrook2'
          : loc === 'Wknight'
          ? 'Wknight'
          : clicked)

          if(loc === 'Wpawn'
          || loc === 'Wking'
          || loc === 'Wqueen'
          || loc === 'Wknight'
          || loc === 'Wrook1'
          || loc === 'Wrook2'
          || loc === 'Wbishop'
          ){
            updatePos({col: col, row: row}) 
            return
          }
        }
      }
      //Checks which piece you picked up and sets the state for the next click
      /* if(loc === 'Bpawn'){
        updateClicked ('Bpawn')
        updatePos ({col: col, row: row})
        return;

      }else if(loc === 'Bbishop'){
        updateClicked ('Bbishop')
        updatePos ({col: col, row: row})
        return;

      }else if(loc === 'Bking'){
        updateClicked ('Bking')
        updatePos ({col: col, row: row})
        return;

      }else if(loc === 'Bqueen'){
        updateClicked ('Bqueen')
        updatePos ({col: col, row: row})
        return;

      }else if(loc === 'Brook'){
        updateClicked ('Brook')
        updatePos ({col: col, row: row})
        return;

      }else if(loc === 'Bknight'){
        updateClicked ('Bknight')
        updatePos ({col: col, row: row})
        return;
      } */

      
      // calls the appropriate function for moving a piece
      squares = (clicked === 'Bpawn' || clicked === 'Wpawn')
      ? movePawn(col,row,squares)
      : (clicked === 'Bknight' || clicked === 'Wknight')
      ? squares = moveKnight(col,row,squares)
      : (clicked === 'Bbishop' || clicked === 'Wbishop')
      ? squares = moveBishop(col,row,squares)
      : (clicked === 'Brook1' || clicked === 'Wrook1' || clicked === 'Brook2' || clicked === 'Wrook2')
      ? squares = moveRook(col,row,squares)
      : (clicked === 'Bqueen' || clicked === 'Wqueen')
      ? squares = moveQueen(col,row,squares)
      : (clicked === 'Bking' || clicked === 'Wking')
      ? squares = moveKing(col,row,squares)
      : squares

    }
    
    // this section is for the coordinates of the moves
    const boardCord = []

    for(let x = 0; x < 8; x++){

      let inner = []
      let letter = String.fromCharCode(65 + x);
        
      for(let y = 8; y > 0; y--){
          inner.push(letter+y)
      }
      
      boardCord.push(inner)
    }

    //checking if the board has changed at all
    let boardChange = false;

    for(let x = 0; x < 8; x++){
      for(let y = 0; y < 8; y++){
        if(current.squares[x][y] !== squares[x][y]){
          boardChange = true
        }
      }
    }
    
    if(boardChange){
      //setState at the end if the board changes
      updateHistory(tempHistory.concat([{
        squares: squares, 
        moveCord: boardCord[col][row],
        didKingMove: {...didKingMove},
        didRookMove: {...didRookMove},
      }]))

      updateStepNumber(tempHistory.length)
      updateBIsNext(!bIsNext)
    }

}

const jumpTo = step => {
  updateStepNumber(step)
  updateBIsNext(!((step%2) === 0))
  updateClicked(null)
  updatePos(null)
  updateDidKingMove({...history[step].didKingMove})
  updateDidRookMove({...history[step].didRookMove})
}

const castle = (col,row,board) => {
  let squares = []
  // to keep the array immutable
  for (let x = 0; x < 8; x++){
    const arr = [...board[x]];

    squares = squares.concat([arr])

  }
  const loc = squares[col][row]

  //if this rook has not moved
  if(!didRookMove[loc]){

    //checking if it is the left rook
    if(col < pos.col){

      //if space is clear between king and left rook
      if(squares[1][row] === null
        && squares[2][row] === null
        && squares[3][row] === null)
        {
          //moving all the pieces
          squares[col][row] = null
          squares[pos.col][pos.row] = null
          squares[2][row] = clicked
          squares[3][row] = loc
          updateClicked(null)
          updatePos(null)
        }

    }else{

      //if space is clear between king and right rook
      if(squares[5][row] === null
        && squares[6][row]=== null)
        {
          //moving all the pieces
          squares[col][row] = null
          squares[pos.col][pos.row] = null
          squares[6][row] = clicked
          squares[5][row] = loc
          updateClicked(null)
          updatePos(null)
        }

    }

  }

  return squares;

}

const movePawn = (col,row,board) => {
  let squares = []
  // to keep the array immutable
  for (let x = 0; x < 8; x++){
    const arr = [...board[x]];

    squares = squares.concat([arr])

  }

  //for taking opponents piece
  if((col === pos.col + 1 || col === pos.col - 1) 
      && bIsNext 
        ? row === pos.row + 1
        : row === pos.row - 1
    ){
    if(squares[col][row] != null){
        //puts new pawn while removing old pawn
        squares[col][row] = bIsNext ? 'Bpawn' : 'Wpawn'
        squares[pos.col][pos.row] = null
        //resets for new click
        updateClicked(null)
        updatePos(null)
        return squares;
    }
  }

  //pawns must stay in the same column when moving
  if(col === pos.col){
    //can take one or two steps forward
    if(bIsNext 
      ? (pos.row === 1 ? (row === (pos.row + 1) || row === (pos.row + 2)) : (row === (pos.row + 1)))
      : (pos.row === 6 ? (row === (pos.row - 1) || row === (pos.row - 2)) : (row === (pos.row - 1)))
      ){
      
      for(let x = 1; x <= Math.abs(row - pos.row) ; x ++){
        if(squares[pos.col][bIsNext ? pos.row+x : pos.row-x] != null){
          return squares;
        }
      }

      //puts new pawn while removing old pawn
      squares[col][row] = bIsNext ? 'Bpawn' : 'Wpawn'
      squares[pos.col][pos.row] = null
      //resets for new click
      updateClicked(null)
        updatePos(null)

    }
  }
  return squares
}

const moveBishop = (col,row,board) => {
  let squares = []
  // to keep the array immutable
  for (let x = 0; x < 8; x++){
    const arr = board[x].slice();

    squares = squares.concat([arr])

  }
  
  //only works if diagonal 
  if(Math.abs(col - pos.col)===Math.abs(row - pos.row)){
    
    //loop that checks if the path is clear
    for(let x = 1; x < Math.abs(col - pos.col) ; x ++){

      //this is for moving right and down
      if((col > pos.col && row > pos.row) && squares[pos.col+x][pos.row+x] != null){
        alert(squares[pos.col+x][pos.row+x])
        return squares;

        //this is for moving left and down
      }else if((col < pos.col && row > pos.row) && squares[pos.col-x][pos.row+x] != null){
        alert(squares[pos.col-x][pos.row+x])
        return squares;

        //this is for moving right and up
      }else if((col > pos.col && row < pos.row) && squares[pos.col+x][pos.row-x] != null){
        alert(squares[pos.col+x][pos.row-x])
        return squares;

        //this is for moving left and up
      }else if((col < pos.col && row < pos.row) && squares[pos.col-x][pos.row-x] != null){
        alert(squares[pos.col-x][pos.row-x])
        return squares;
      }
    }
    //moving the piece
    squares[col][row] = bIsNext ? 'Bbishop' : 'Wbishop'
    squares[pos.col][pos.row] = null
    //reset for new click
    updateClicked(null)
    updatePos(null)

  }
  return squares;

}

const moveKnight = (col,row,board) => {
  let squares = []
  // to keep the array immutable
  for (let x = 0; x < 8; x++){
    const arr = board[x].slice();

    squares = squares.concat([arr])

  }

  if((Math.abs(col - pos.col)===2 && Math.abs(row - pos.row)===1) || (Math.abs(col - pos.col)===1 && Math.abs(row - pos.row)===2) ){

    //puts new piece while removing old piece
    squares[col][row] = bIsNext ? 'Bknight' : 'Wknight'
    squares[pos.col][pos.row] = null
    //reset for new click
    updateClicked(null)
    updatePos(null)

  }
  return squares;
}

const moveRook = (col,row,board) => {
  
  let squares = []
  // to keep the array immutable
  for (let x = 0; x < 8; x++){
    const arr = board[x].slice();

    squares = squares.concat([arr])

  }

  // if the rook is moving horizontally
  if(row === pos.row){
    //check if path is clear
    for (let x = 1; x < Math.abs(col - pos.col); x ++){
      //going right
      if(col > pos.col && squares[pos.col+x][row] != null){
        return squares;
      //going left
      } else if(col < pos.col && squares[pos.col-x][row] != null){
        return squares; 
      }
    }
    //moving the piece
    squares[col][row] = clicked
    squares[pos.col][pos.row] = null
    //reset for new click
    updateClicked(null)
    updatePos(null)
    //noting that this rook has moved and can no longer perform castle
    updateDidRookMove(didRookMove => ({...didRookMove, [clicked]: true}))

  // if the rook is moving vertically
  }else if(col === pos.col){
    //check if the path is clear
    for (let y = 1; y < Math.abs(row - pos.row); y ++){
      //going down
      if(row > pos.row && squares[col][pos.row+y] != null){
        return squares;
      //going up
      }else if(row < pos.row && squares[col][pos.row-y] != null){
        return squares
      }
    }
    //moving the piece
    squares[col][row] = clicked
    squares[pos.col][pos.row] = null
    //reset for new click
    updateClicked(null)
    updatePos(null)
    //noting that this rook has moved and can no longer perform castle
    updateDidRookMove(didRookMove => ({...didRookMove, [clicked]: true}))
  }

  return squares;
}

const moveQueen = (col,row,board) => {
  let squares = []
  // to keep the array immutable
  for (let x = 0; x < 8; x++){
    const arr = board[x].slice();

    squares = squares.concat([arr])

  }

  // if the queen is moving horizontally
  if(row === pos.row){
    //check if path is clear
    for (let x = 1; x < Math.abs(col - pos.col); x ++){
      //going right
      if(col > pos.col && squares[pos.col+x][row] != null){
        return squares;
      //going left
      } else if(col < pos.col && squares[pos.col-x][row] != null){
        return squares; 
      }
    }
    //moving the piece
    squares[col][row] = bIsNext ? 'Bqueen' : 'Wqueen'
    squares[pos.col][pos.row] = null
    //reset for new click
    updateClicked(null)
    updatePos(null)

  // if the rook is moving vertically
  }else if(col === pos.col){
    //check if the path is clear
    for (let y = 1; y < Math.abs(row - pos.row); y ++){
      //going down
      if(row > pos.row && squares[col][pos.row+y] != null){
        return squares;
      //going up
      }else if(row < pos.row && squares[col][pos.row-y] != null){
        return squares
      }
    }
    //moving the piece
    squares[col][row] = bIsNext ? 'Bqueen' : 'Wqueen'
    squares[pos.col][pos.row] = null
    //reset for new click
    updateClicked(null)
    updatePos(null)

  }else if(Math.abs(col - pos.col)===Math.abs(row - pos.row)){
    
    //loop that checks if the path is clear
    for(let x = 1; x < Math.abs(col - pos.col) ; x ++){

      //this is for moving right and down
      if((col > pos.col && row > pos.row) && squares[pos.col+x][pos.row+x] != null){
        alert(squares[pos.col+x][pos.row+x])
        return squares;

        //this is for moving left and down
      }else if((col < pos.col && row > pos.row) && squares[pos.col-x][pos.row+x] != null){
        alert(squares[pos.col-x][pos.row+x])
        return squares;

        //this is for moving right and up
      }else if((col > pos.col && row < pos.row) && squares[pos.col+x][pos.row-x] != null){
        alert(squares[pos.col+x][pos.row-x])
        return squares;

        //this is for moving left and up
      }else if((col < pos.col && row < pos.row) && squares[pos.col-x][pos.row-x] != null){
        alert(squares[pos.col-x][pos.row-x])
        return squares;
      }
    }
    //moving the piece
    squares[col][row] = bIsNext ? 'Bqueen' : 'Wqueen'
    squares[pos.col][pos.row] = null
    //reset for new click
    updateClicked(null)
    updatePos(null)
  }
  return squares;
}

const moveKing = (col,row,board) => {
  let squares = []
  // to keep the array immutable
  for (let x = 0; x < 8; x++){
    const arr = board[x].slice();

    squares = squares.concat([arr])

  }


  if(Math.abs(pos.col - col) <= 1 && Math.abs(pos.row - row) <= 1){
    //moving the piece
    squares[col][row] = bIsNext ? 'Bking' : 'Wking'
    squares[pos.col][pos.row] = null
    //reset for new click
    updateClicked(null)
    updatePos(null)
    //noting that this king has moved and can no longer perform castle
    updateDidKingMove(didKingMove => ({...didKingMove, [clicked]: true}))
  }

  return squares

}


const renderCurrent = history[stepNumber];

let status;
status = 'Next player: ' + (bIsNext ? 'Black' : 'White');


return (
  <div className="game">
    <div className="game-board">
      <Board 
          squares={renderCurrent.squares}
          onClick={(i) => handleClick(i)}
      />
    </div>
    <div className="game-info">
      <div>{status}</div>   
      
      <button 
        onClick={() => {updateListDescend(!listDescend)}}
      > Flip moves
      </button>

      <ol>
        <MoveList
          history = {history}
          stepNumber = {stepNumber}
          onClick={(step) => jumpTo(step)}
          listDescend = {listDescend}
        />
      </ol>
      
    </div>
  </div>
);

}


  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
