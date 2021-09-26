import {Component} from "react";

export default class SelectState extends Component {
	renderOption = (stateToPeople) => {
		const getKeys = Object.keys(stateToPeople);

		return getKeys.map(key => {
			return <option key={key} value={key}>{key}</option>
		});
	};


	render() {
		const {stateToPeople, selectedState, onHandleChange} = this.props;

		return (
			<div className="select-state">
				<select value={selectedState} onChange={onHandleChange}>
					<option value="">Sort by state</option>
					{this.renderOption(stateToPeople)}
				</select>
			</div>
		)
	}
}