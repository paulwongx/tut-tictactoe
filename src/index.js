import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Board from './Board.js';
import calculateWinner from './CalculateWinner.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  // Handler functions go here
  handleClick(i) {
    console.log(`Step Number: ${this.state.stepNumber}`);
    const history = this.state.history.slice(0, this.state.stepNumber +1); // Overall, this just makes a copy of the history array. Slice is nonmutilating, so gets a fresh copy of the game board. Slice's second argument is also non-inclusive hence the +1
    console.log(`History: ${JSON.stringify(history)}`);
    const current = history[history.length -1]; // Gets the last item in the array as current
    console.log(`Current: ${JSON.stringify(current)}`);
    const squares = current.squares.slice(); // makes a copy of the sq. This is NOT an array
    console.log(`Squares Before: ${squares} that is ${typeof squares} type`);
    if (calculateWinner(squares) || squares[i]) { //if someone won, or you click on same square, do nothing
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O"; // Places X or O based on who's turn it is
    console.log(`Squares After: ${squares}`);
    this.setState({
      history: history.concat([{ // concat adds a new element to the history array of objects
        'squares': squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0, // reset next turn. If even then O's turn / false
    });
  }

  render() {
    // Normal background functions go here - these functions can render html
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares = {current.squares}
            onClick = {(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
