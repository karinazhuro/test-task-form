import "./input-search.css";

const InputSearch = ({onTextChange}) => {
	return (
		<div className="input-search">
			<input className="input-text"
						 type="text"
						 placeholder="Search by name:"
						 onChange={onTextChange}/>
		</div>
	)
};

export default InputSearch;