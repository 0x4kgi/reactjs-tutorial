import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//JSX does not allow comments inside of the html tags, <!-- --> does not work too
//this function just returns the square component
function Square(props) {
	//here, we set the attribute of the button
	return (									
		<button							
			className="square"
			//props.onClick and .value came from the Board class render square, also don't comment inside of the HTML tags lol
			onClick={props.onClick}		
		>									
			{props.value}					
		</button>
	);
}

class Board extends React.Component {
	//function that... renders... the square
	renderSquare(i) {								
		return (									//calling funcs in React is 
		<Square										//<FuncName property={value} /> note the capitalization and the XML tag style
			value={this.props.squares[i]}			//append the square value 			
			onClick={() => this.props.onClick(i) }	//sets the square on click func to handleClick in this class
		/>
		);
	}

	//render() func, important in React classes, if the return HTML tags, that is
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
	//create a constructor when having a class that's going to have class variables
	constructor(props) {
		//always have super(props) when creating constructors
		super(props);

		//this creates a new history array to have all the moves in the
		//game save here
		this.state = {
			//fill history with empty game grid array
			history: [{
				squares: Array(9).fill(null)
			}],

			//variable for which player ids going to move
			xIsNext: true,

			//step counter, indicates what move are we in the game
			stepNumber: 0,
		};
	}

	//handleClick function, handles the events when the square is clicked
	handleClick(i) {
		//gets the history, this is the initialization 
		const history = this.state.history.slice(0, this.state.stepNumber + 1);

		//shows the current progress, showing the most recent move
		const current = history[history.length - 1];

		//slice()'d the state so we can go back in the past. and treated it as immutable									
		const squares = current.squares.slice();

		//if there is a winner or the square is filled, do nothing		
		if (calculateWinner(squares) || squares[i]) {	
			return;
		}

		//places the appropriate player when the square is clicked
		squares[i] = this.state.xIsNext ? 'X' : 'O';

		//no idea where setState came from, im assuming its from this.state and 
		//React has strict naming; setState = new values to this.state	
		this.setState({	
			//combines the old history array to the new history array one, i think?
			history: history.concat([{
				squares: squares,
			}]),

			//changes the player						
			xIsNext: !this.state.xIsNext,	
			
			//indicates how many move are we in
			stepNumber: history.length,
		});
	}

	//function for history button onClick
	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) === 0,
		});
	}

	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares);

		const moves = history.map((step, move) => {
			const desc = move 
				? 'Go to move # ' + move
				: 'Go to move start';

			return (
				<li key={move}>
					<button onClick={() => this.jumpTo(move)}>{desc}</button>
				</li>
			);
		})

		let status;
		if (winner) {
			status = 'Winner: ' + winner; 
		} else {
			status = 'Next player: ' + (this.state.xIsNext? 'X' : 'O');
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
			return squares[a];
		}
	}
	return null;
}
