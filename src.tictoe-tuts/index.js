import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Sample react component class/type "shopping-list" take a parameter of name props stands for "properties"
//
// class ShoppingList extends React.Component {
//     render() {
//         return (
//             <div className="shopping-list">
//                 <h1>Shopping List for {this.props.name} </h1>
//                 <ul>
//                     <li>Instagram</li>
//                     <li>WhatsApp</li>
//                     <li>Oculus</li>
//                 </ul>
//             </div>
//         );
//     }
// }  

// ReactDOM.render(<ShoppingList />, document.getElementById('root'));
// // Example Usage: <ShoppingList name="Mark"/>



// class Square extends React.Component {
//     // constructor(props){
//     //     super(props);
//     //     this.state = {
//     //       value: null,  
//     //     };
//     // }

//     render() {
//       return (
//         // <button className="square">
//         //   {/* TODO */}
//         // </button>

//         // <button className="square" onClick={function(){ alert('click');} }>
//         // <button className="square" onClick={() => alert('click') }>
//         //  {this.props.value}
//         // </button>

//         // <button 
//         //     className="square" 
//         //     onClick={() => this.setState({ value: 'X'}) }>
//         //   {this.state.value}
//         // </button>

//         <button 
//             className="square" 
//             onClick={() => this.props.onClick() }>
//         {this.props.value}
//         </button>
//       );
//     }
//   }

// Function Component
function Square(props){
    return(
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
  
  class Board extends React.Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         squares: Array(9).fill(null),
    //         isX: true,
    //     };
    // }

    // handleClick(i){
    //     const squares = this.state.squares.slice();
    //     if(calculateWinner(squares) || squares[i]){
    //         return;
    //     }
    //     // squares[i] = 'X';
    //     squares[i] =this.state.isX ? 'X' : 'O';
    //     // this.setState({squares: squares});
    //     this.setState({
    //         squares: squares,
    //         isX: !this.state.isX,
    //     });
    //     console.log(squares);
    // }

    renderSquare(i) {
        // return <Square />;
        // return <Square value={i} />;
        return (
                <Square 
                    // value={this.state.squares[i]} 
                    value = {this.props.squares[i]}
                    // onClick={() => this.handleClick(i)}
                    onClick={() => this.props.onClick(i)}
                />
                );
    }
  
    render() {
    //   const status = 'Next player: X';
    // const status = 'Next player: ' + (this.state.isX ? 'X' : 'O');
        // const winner = calculateWinner(this.state.squares);
        // let status;
        // if(winner){
        //     status = 'Winner: ' + winner;
        // }else{
        //     status = 'Next player: ' + (this.state.isX ? 'X' : 'O');
        // }
  
        return (
        <div>
            {/* <div className="status">{status}</div> */}
            <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            </div>
            <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            </div>
            <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            </div>
        </div>
        );
    }
  }
  
  class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            isX: true,
        };
    }

    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();
        if(calculateWinner(squares) || squares[i]){
            return;
        }
        // squares[i] = 'X';
        squares[i] =this.state.isX ? 'X' : 'O';
        // this.setState({squares: squares});
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            isX: !this.state.isX,
        });
        console.log(squares);
    }

    jumpTo(step){
        this.setState({
            stepNumber: step,
            isX: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ? 'Go to move #' + move : 'Go to game start';
            return(
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if(winner){
            status = 'Winner: ' + winner;
        }else{
            status = 'Next player: ' + (this.state.isX ? 'X' : 'O');
        }
        
        return (
        <div className="game">
            <div className="game-board">
            {/* <Board /> */}
            <Board
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
            />
            </div>
            <div className="game-info">
                {/*<div>{/* status *}</div>*/}
                <div>{status}</div>
                {/*<ol>{/* TODO * }</ol>*/}
                <ol>{moves}</ol>
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

  function calculateWinner(squares){
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
          return squares[a];
        }
      }
      return null;
  }