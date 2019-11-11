import React from 'react';
import Square from './square.js';


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

export default Board;