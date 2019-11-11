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
    
    renderBoard(row, col) {
        let board = [];
        let sq = 0;
        for (let i = 0; i < row; i += 1) {
            let squares = [];
            for (let j = 0; j < col; j += 1) {
                squares.push(this.renderSquare(sq));
                sq += 1;                
            }
            
            board.push(
                <div className="board-row">
                    {squares}
                </div>
            );
        }

        return board;
    }

	//render() func, important in React classes, if the return HTML tags, that is
	render() {																		
		return (
			<div>
				{this.renderBoard(3,3)}
			</div>
		);
	}
}

export default Board;