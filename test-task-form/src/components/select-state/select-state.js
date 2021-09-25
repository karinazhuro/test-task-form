const SelectState = ({stateToPeople}) => {
	const renderOption = () => {
		stateToPeople.keys().map(state => console.log(state))
	};

  return (
		<div className="select-state">
			<select>
				{renderOption()}
			</select>
		</div>
	)
};

export default SelectState;