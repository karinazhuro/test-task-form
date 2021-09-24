import React, {Component} from 'react';

import InputSearch from "../input-searching";
import UserTable from "../user-table";
import TestServices from "../../services/test-services";

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			people: [],
			inputSearchValue: '',
		};

		this.onTextChange = this.onTextChange.bind(this);
	}

	testServices = new TestServices();

	componentDidMount() {
		this.init()
	}

	async init() {
		const people = await this.testServices.getPeople();

		this.setState({
			people,
		})
	}

	onTextChange(e) {
		const inputSearchValue = e.target.value;

		this.setState({
			inputSearchValue,
		})
	};

	filteredPeopleSelector(state) {
		const {people, inputSearchValue} = state;
		const containsName = (name) => {
			return name.toLowerCase().startsWith(inputSearchValue.trim().toLowerCase());
		};

		if (inputSearchValue === '') return people;

		return people.filter(value => containsName(value.firstName) || containsName(value.lastName));
	};

	render() {
		return (
			<div>
				<InputSearch onTextChange={this.onTextChange}/>
				<UserTable people={this.filteredPeopleSelector(this.state)}/>
			</div>
		)
	}
};