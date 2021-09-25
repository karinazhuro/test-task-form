import React, {Component} from 'react';

import InputSearch from "../input-searching";
import UserTable from "../user-table";
import UserInfo from "../user-info";

import ItrexServices from "../../services/itrex-services";
import groupBy from "../../utils/groupBy";
import SelectState from "../select-state";

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			people: [],
			stateToPeople: {},
			inputSearchValue: '',
			person: null,
		};

		this.onTextChange = this.onTextChange.bind(this);
		this.onRowClick = this.onRowClick.bind(this);
	}

	itrexServices = new ItrexServices();

	componentDidMount() {
		this.init()
	}

	async init() {
		const people = await this.itrexServices.getPeople();
		const stateToPeople = groupBy(people, (person) => person.adress.state);

		this.setState({
			people,
			stateToPeople,
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

	onRowClick(person) {
		this.setState({
			person,
		});
	};

	render() {
		const {person, stateToPeople} = this.state;

		return (
			<div>
				<InputSearch onTextChange={this.onTextChange}/>
				<SelectState stateToPeople={stateToPeople}/>
				<UserTable people={this.filteredPeopleSelector(this.state)}
									 onRowClick={this.onRowClick}
									 sortByColumns={this.sortByColumns}/>
				{person && <UserInfo person={person}/>}
			</div>
		)
	}
}
;