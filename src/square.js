import React from 'react';

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

export default Square;