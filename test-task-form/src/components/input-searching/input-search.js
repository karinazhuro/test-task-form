import React from 'react';

const InputSearch = ({onTextChange}) => {
	return (
		<div className="input-searching">
			<input type="text"
						 placeholder="Search by name:"
						 onChange={onTextChange}/>
		</div>
	)
};

export default InputSearch;