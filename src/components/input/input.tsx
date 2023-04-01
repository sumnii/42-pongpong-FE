import React from 'react';

const Input: React.FC<{items: string[]}> = (props) => {
	return (
		<>
			{props.items.map(item => 
				<div key={item}>
					<input placeholder={item}></input>
				</div>
				)}
		</>
	);
}

export default Input;
