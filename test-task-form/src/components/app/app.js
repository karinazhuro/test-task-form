import React, {Component} from 'react';

import InputSearch from "../input-searching";
import UserTable from "../user-table";
import UserInfo from "../user-info";

import TestServices from "../../services/test-services";

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			people: [],
			inputSearchValue: '',
			person: null,
		};

		this.onTextChange = this.onTextChange.bind(this);
		this.onClickRow = this.onClickRow.bind(this);
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

	onClickRow(person) {
		this.setState({
			person,
		});
	}

	render() {
		const {person} = this.state;
		const info = person ? <UserInfo person={person}/> : null;

		return (
			<div>
				<InputSearch onTextChange={this.onTextChange}/>
				<UserTable people={this.filteredPeopleSelector(this.state)} onClickRow={this.onClickRow}/>
				{person && <UserInfo person={person}/>}
			</div>
		)
	}
};