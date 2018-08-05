import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
var _ = require('lodash');

function Square(props){
    return (
        <div className="square" onClick={props.onClick}>
            {props.value}
        </div>  
    );
}
  
class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square 
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}           
            />
        );
    }

    render() {
        return (
            <div>
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
            isNextX: true,
            stepNumber: 0,
        };
    }

    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();
        
        if(calculateWinner(squares) || squares[i]){
            return;
        }
        
        squares[i] = (this.state.isNextX ? 'X' : 'O');
        
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            isNextX: !this.state.isNextX,
        });
    }

    jumpTo(step){
        this.setState({
            stepNumber: step,
            isNextX: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares); 

        const moves = history.map((step, move) => {
            const desc = move ? 
                    'Go to move # ' + move + ', ' + (move % 2 === 0 ? 'O' : 'X') + '( ' + ', )': 
                    'Go to game start' 
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
            status = 'Next player: ' + (this.state.isNextX ? 'X' : 'O');
        }

        return (
        <div className="game">
            <div className="game-board">
            <Board 
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}/>
            </div>
            <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
            </div>
        </div>
        );
    }
}

class SearchBar extends React.Component{
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: ''
        };
    }

    handleChange(e){
        this.setState({
            value: e.target.value,
        });
    }

    render(){
        return (
            <div className="searchbar">
                <label htmlFor="search">Search: </label>
                <input name="search" value={this.state.value} onChange={this.handleChange} placeholder="Enter product..."/>
            </div>
        );
    }
}

function TableRow(props){
    const data = [];

    const arrangedData = _.groupBy(props.body, function(v){
        return v.category;
    });

    var num = 0;
    for(const key in arrangedData){
        arrangedData[key].map((v, i) => {
            let color = null;
            if(i === 0){
                data.push(
                    <tr key={key}>
                        <th colSpan="2">{key}</th>
                    </tr>
                );
            }
                if(!v.stocked){
                    color = "red";
                }
    
                data.push(
                    <tr key={num}>
                        <td style={{color: color}}>{v.name}</td>
                        <td>{v.price}</td>
                    </tr>
                );
            num += 1;
        });
   }

    console.log(data);

    return(data);
}

class ProductTable extends React.Component {
    render(){
        const thead = this.props.head.map((v) => {
            return (
                <th key={v}>{v}</th>
            );
        });

        return(
            <table>
                <thead>
                    <tr>
                       {thead}
                    </tr>
                </thead>
                <tbody>
                    <TableRow body={this.props.body}/>
                </tbody>
            </table>       
        );
    }
}

class FilterableProductTable extends React.Component{
    render(){
        let productHead = ['Name', 'Price'];

        let productList = [
            {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
            {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
            {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
            {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
            {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
            {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
        ];

        return(
            <div className="product">
                <br/>
                <h1>Product List Activity</h1>
               <SearchBar/>
               <br/>
               <ProductTable  head={productHead} body={productList}/>
            </div>
        );
    }
}

class App extends React.Component{
    render() {
        return (
            <div>
                <Game />
                <FilterableProductTable/>
            </div>
        );
    }
}

  // ========================================
  
ReactDOM.render(
    <App />,
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