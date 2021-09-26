const SelectState = ({stateToPeople, selectedState, onHandleChange}) => {
	const renderOption = () => {
		const getKeys = Object.keys(stateToPeople);

		return getKeys.map(key => {
			return <option key={key} value={key}>{key}</option>
		});
	};

	return (
		<div className="select-state">
			<select value={selectedState} onChange={onHandleChange}>
				<option value="">Sort by state</option>
				{renderOption()}
			</select>
		</div>
	)
}

export default SelectState;