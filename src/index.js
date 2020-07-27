import React from 'react';
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

function Square(props) {
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
  
  class Board extends React.Component {

    fillBlack(i){ //loop for the background of each square
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

    checkValue(name){
      return name === "Bking" 
      ? <img src={Bking} alt = '' className={'king'}/>
      : name === "Bpawn"
      ? <img src={Bpawn} alt = '' className={'pawn'}/>
      : name === "Bqueen"
      ? <img src={Bqueen} alt = '' className={'Bpiece'}/>
      : name === "Bknight"
      ? <img src={Bknight} alt = '' className={'Bpiece'}/>
      : name === "Brook"
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
      : name === "Wrook"
      ? <img src={Wrook} alt = '' className={'Bpiece'}/>
      : name === "Wbishop"
      ? <img src={Wbishop} alt = '' className={'Bpiece'}/>
      : null

    }


    renderSquare = i => {

      const col = i % 8;
      const row = Math.floor(i/8) 
     
      return (
        <Square 
            blackBG = {this.fillBlack(i)}
            value={this.checkValue(this.props.squares[col][row])}
            onClick={() => this.props.onClick(i)}
            
        />
      );
    }
  
    render() {
      const outer = []

      for(let x = 0; x < 8; x++){ //loop for setting up the board :D

        let inner = []

        for(let y = 0; y < 8; y++){
          inner.push(this.renderSquare(x*8 + y))
        }

        outer.push(<div className='board-row'>{inner}</div>)
      }
  
      return (
        <div>
          {outer}
        </div>
      );
    }
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



  class Game extends React.Component {
      constructor(props){
          super(props);
          this.state = {
              history: [{
                  squares : this.boardSetup(),
                  moveCord : null
              }],
              stepNumber: 0,
              blackIsNext: true,
              listDescend: true,
              clicked: null,
              pos: null,
          };
      }

      boardSetup = () => {
        let chessBoard = []

        for (let x = 0; x < 8; x++){
          chessBoard.push(Array(8).fill(null));
        }

        for (let x = 0; x < 8; x++){
          
          chessBoard[x][1] = "Bpawn"
          chessBoard[x][6] = "Wpawn"
          
        }

        chessBoard[0][0] = "Brook"
        chessBoard[7][0] = "Brook"
        
        chessBoard[1][0] = "Bknight"
        chessBoard[6][0] = "Bknight"

        chessBoard[2][0] = "Bbishop"
        chessBoard[5][0] = "Bbishop"

        chessBoard[3][0] = "Bqueen"
        chessBoard[4][0] = "Bking"

        chessBoard[0][7] = "Wrook"
        chessBoard[7][7] = "Wrook"

        chessBoard[1][7] = "Wknight"
        chessBoard[6][7] = "Wknight"

        chessBoard[2][7] = "Wbishop"
        chessBoard[5][7] = "Wbishop"

        chessBoard[3][7] = "Wqueen"
        chessBoard[4][7] = "Wking"

  
        return chessBoard;
        
      }

      jumpTo = step => {
          this.setState({
              stepNumber: step,
              blackIsNext: (step%2) === 0,
              clicked: null,
              pos: null
          });
      }


      handleClick = i => {
        // this is for the movelist section
        const history = this.state.history.slice(0, this.state.stepNumber + 1); 
        const current = history[history.length - 1];
        let squares = []

        // to keep the array immutable 
        for (let x = 0; x < 8; x++){
          const arr = current.squares[x].slice();

          squares.push(arr)

        }
       
        // first click
        const col = i % 8;
        const row = Math.floor(i/8) 
        let loc = squares[col][row]

        // this is to check if it is the first click
        if(this.state.clicked === null && loc === null){
          return;
        }else{
          
        
        
          //Checks which piece you picked up and sets the state for the next click
          if(loc === 'Bpawn'){
            this.setState({
              clicked: 'Bpawn',
              pos: {col: col, row: row}
            })
            return;
          }else if(loc === 'Bbishop'){
            this.setState({
              clicked: 'Bbishop',
              pos: {col: col, row: row}
            })
            return;
          }else if(loc === 'Bking'){
            this.setState({
              clicked: 'Bking',
              pos: {col: col, row: row}
            })
            return;
          }else if(loc === 'Bqueen'){
            this.setState({
              clicked: 'Bqueen',
              pos: {col: col, row: row}
            })
            return;
          }else if(loc === 'Brook'){
            this.setState({
              clicked: 'Brook',
              pos: {col: col, row: row}
            })
            return;
          }else if(loc === 'Bknight'){
            this.setState({
              clicked: 'Bknight',
              pos: {col: col, row: row}
            })
            return;
          }

          // calls the appropriate function for moving a piece
          squares = this.state.clicked === 'Bpawn'
          ? this.movePawn(col,row,squares)
          : this.state.clicked === 'Bknight'
          ? squares = this.moveKnight(col,row,squares)
          : this.state.clicked === 'Bbishop'
          ? squares = this.moveBishop(col,row,squares)
          : this.state.clicked === 'Brook'
          ? squares = this.moveRook(col,row,squares)
          : this.state.clicked === 'Bqueen'
          ? squares = this.moveQueen(col,row,squares)
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
          this.setState ({
              history: history.concat([{
                  squares: squares, 
                  moveCord: boardCord[col][row]
              }]),
              stepNumber: history.length,
              blackIsNext: !this.state.blackIsNext,

          });
        }

    }

    movePawn = (col,row,board) => {
      let squares = []
      // to keep the array immutable
      for (let x = 0; x < 8; x++){
        const arr = board[x].slice();

        squares = squares.concat([arr])

      }

      //for taking opponents piece
      if((col === this.state.pos.col + 1 || col === this.state.pos.col - 1) && row === this.state.pos.row + 1){
        if(squares[col][row] != null){
           //puts new pawn while removing old pawn
           squares[col][row] = 'Bpawn'
           squares[this.state.pos.col][this.state.pos.row] = null
           //resets for new click
           this.setState({
             clicked: null,
             pos: null
           })
           return squares;
        }
      }

      //pawns must stay in the same column when moving
      if(col === this.state.pos.col){
        //can take one or two steps forward
        if(this.state.pos.row === 1 ? (row === (this.state.pos.row + 1) || row === (this.state.pos.row + 2)) : (row === (this.state.pos.row + 1))){
          for(let x = 1; x <= Math.abs(row - this.state.pos.row) ; x ++){
            if(squares[this.state.pos.col][this.state.pos.row+x] != null){
              return squares;
            }
          }

          //puts new pawn while removing old pawn
          squares[col][row] = 'Bpawn'
          squares[this.state.pos.col][this.state.pos.row] = null
          //resets for new click
          this.setState({
            clicked: null,
            pos: null
          })

        }
      }
      return squares
    }

    moveBishop = (col,row,board) => {
      let squares = []
      // to keep the array immutable
      for (let x = 0; x < 8; x++){
        const arr = board[x].slice();

        squares = squares.concat([arr])

      }
      
      //only works if diagonal 
      if(Math.abs(col - this.state.pos.col)===Math.abs(row - this.state.pos.row)){
        
        //loop that checks if the path is clear
        for(let x = 1; x < Math.abs(col - this.state.pos.col) ; x ++){

          //this is for moving right and down
          if((col > this.state.pos.col && row > this.state.pos.row) && squares[this.state.pos.col+x][this.state.pos.row+x] != null){
            alert(squares[this.state.pos.col+x][this.state.pos.row+x])
            return squares;

            //this is for moving left and down
          }else if((col < this.state.pos.col && row > this.state.pos.row) && squares[this.state.pos.col-x][this.state.pos.row+x] != null){
            alert(squares[this.state.pos.col-x][this.state.pos.row+x])
            return squares;

            //this is for moving right and up
          }else if((col > this.state.pos.col && row < this.state.pos.row) && squares[this.state.pos.col+x][this.state.pos.row-x] != null){
            alert(squares[this.state.pos.col+x][this.state.pos.row-x])
            return squares;

            //this is for moving left and up
          }else if((col < this.state.pos.col && row < this.state.pos.row) && squares[this.state.pos.col-x][this.state.pos.row-x] != null){
            alert(squares[this.state.pos.col-x][this.state.pos.row-x])
            return squares;
          }
        }
        //moving the piece
        squares[col][row] = 'Bbishop'
        squares[this.state.pos.col][this.state.pos.row] = null
        this.setState({
          clicked: null,
          pos: null
        })
    
   
      }
      return squares;

    }

    moveKnight = (col,row,board) => {
      let squares = []
      // to keep the array immutable
      for (let x = 0; x < 8; x++){
        const arr = board[x].slice();

        squares = squares.concat([arr])

      }

      if((Math.abs(col - this.state.pos.col)===2 && Math.abs(row - this.state.pos.row)===1) || (Math.abs(col - this.state.pos.col)===1 && Math.abs(row - this.state.pos.row)===2) ){

        //puts new piece while removing old piece
        squares[col][row] = 'Bknight'
        squares[this.state.pos.col][this.state.pos.row] = null
        //resets for new click
        this.setState({
          clicked: null,
          pos: null
        })

      }
      return squares;
    }

    moveRook = (col,row,board) => {
      let squares = []
      // to keep the array immutable
      for (let x = 0; x < 8; x++){
        const arr = board[x].slice();

        squares = squares.concat([arr])

      }

      // if the rook is moving horizontally
      if(row === this.state.pos.row){
        //check if path is clear
        for (let x = 1; x < Math.abs(col - this.state.pos.col); x ++){
          //going right
          if(col > this.state.pos.col && squares[this.state.pos.col+x][row] != null){
            return squares;
          //going left
          } else if(col < this.state.pos.col && squares[this.state.pos.col-x][row] != null){
            return squares; 
          }
        }
        //moving the piece
        squares[col][row] = 'Brook'
        squares[this.state.pos.col][this.state.pos.row] = null
        this.setState({
          clicked: null,
          pos: null
        })

      // if the rook is moving vertically
      }else if(col === this.state.pos.col){
        //check if the path is clear
        for (let y = 1; y < Math.abs(row - this.state.pos.row); y ++){
          //going down
          if(row > this.state.pos.row && squares[col][this.state.pos.row+y] != null){
            return squares;
          //going up
          }else if(row < this.state.pos.row && squares[col][this.state.pos.row-y] != null){
            return squares
          }
        }
        //moving the piece
        squares[col][row] = 'Brook'
        squares[this.state.pos.col][this.state.pos.row] = null
        this.setState({
          clicked: null,
          pos: null
        })
      }

      return squares;
    }

    moveQueen = (col,row,board) => {
      let squares = []
      // to keep the array immutable
      for (let x = 0; x < 8; x++){
        const arr = board[x].slice();

        squares = squares.concat([arr])

      }

      // if the queen is moving horizontally
      if(row === this.state.pos.row){
        //check if path is clear
        for (let x = 1; x < Math.abs(col - this.state.pos.col); x ++){
          //going right
          if(col > this.state.pos.col && squares[this.state.pos.col+x][row] != null){
            return squares;
          //going left
          } else if(col < this.state.pos.col && squares[this.state.pos.col-x][row] != null){
            return squares; 
          }
        }
        //moving the piece
        squares[col][row] = 'Bqueen'
        squares[this.state.pos.col][this.state.pos.row] = null
        this.setState({
          clicked: null,
          pos: null
        })

      // if the rook is moving vertically
      }else if(col === this.state.pos.col){
        //check if the path is clear
        for (let y = 1; y < Math.abs(row - this.state.pos.row); y ++){
          //going down
          if(row > this.state.pos.row && squares[col][this.state.pos.row+y] != null){
            return squares;
          //going up
          }else if(row < this.state.pos.row && squares[col][this.state.pos.row-y] != null){
            return squares
          }
        }
        //moving the piece
        squares[col][row] = 'Bqueen'
        squares[this.state.pos.col][this.state.pos.row] = null
        this.setState({
          clicked: null,
          pos: null
        })
      }else if(Math.abs(col - this.state.pos.col)===Math.abs(row - this.state.pos.row)){
        
        //loop that checks if the path is clear
        for(let x = 1; x < Math.abs(col - this.state.pos.col) ; x ++){

          //this is for moving right and down
          if((col > this.state.pos.col && row > this.state.pos.row) && squares[this.state.pos.col+x][this.state.pos.row+x] != null){
            alert(squares[this.state.pos.col+x][this.state.pos.row+x])
            return squares;

            //this is for moving left and down
          }else if((col < this.state.pos.col && row > this.state.pos.row) && squares[this.state.pos.col-x][this.state.pos.row+x] != null){
            alert(squares[this.state.pos.col-x][this.state.pos.row+x])
            return squares;

            //this is for moving right and up
          }else if((col > this.state.pos.col && row < this.state.pos.row) && squares[this.state.pos.col+x][this.state.pos.row-x] != null){
            alert(squares[this.state.pos.col+x][this.state.pos.row-x])
            return squares;

            //this is for moving left and up
          }else if((col < this.state.pos.col && row < this.state.pos.row) && squares[this.state.pos.col-x][this.state.pos.row-x] != null){
            alert(squares[this.state.pos.col-x][this.state.pos.row-x])
            return squares;
          }
        }
        //moving the piece
        squares[col][row] = 'Bqueen'
        squares[this.state.pos.col][this.state.pos.row] = null
        this.setState({
          clicked: null,
          pos: null
        })
      }
      return squares;
    }

    moveKing = (col,row,board) => {
      let squares = []
      // to keep the array immutable
      for (let x = 0; x < 8; x++){
        const arr = board[x].slice();

        squares = squares.concat([arr])

      }
    }

    render() {
        
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares) ? current.squares[calculateWinner(current.squares)[0]] : null;

        
        let status;

        if(winner){
          status = 'Winner ' + winner;
        }else {
          status = 'Next player: ' + (this.state.blackIsNext ? 'Black' : 'Black');
        }
        
      return (
        <div className="game">
          <div className="game-board">
            <Board 
                winningSquares = {calculateWinner(current.squares)}
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>   
            
            <button 
              onClick={() => {this.setState({
                listDescend: !this.state.listDescend
              })}}
              >Flip moves
            </button>

            <ol>
              <MoveList
                history = {this.state.history}
                stepNumber = {this.state.stepNumber}
                onClick={(step) => this.jumpTo(step)}
                listDescend = {this.state.listDescend}
              />
            </ol>
            
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [a,b,c];
      }
    }
    return null;
  }