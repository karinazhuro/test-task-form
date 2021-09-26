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
			selectedState: null,
		};

		this.onTextChange = this.onTextChange.bind(this);
		this.onRowClick = this.onRowClick.bind(this);
		this.onHandleChange = this.onHandleChange.bind(this);
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
		const {people, inputSearchValue, stateToPeople, selectedState} = state;
		const containsName = (name) => {
			return name.toLowerCase().startsWith(inputSearchValue.trim().toLowerCase());
		};
		const sortedPeople = selectedState ? stateToPeople[selectedState] : people;

		console.log(selectedState);

		if (inputSearchValue === '' && selectedState === null) return people;

		return sortedPeople.filter(value => containsName(value.firstName) || containsName(value.lastName));
	};

	onRowClick(person) {
		this.setState({
			person,
		});
	};

	onHandleChange(e) {
		const value = e.target.value
		const selectedState = value && true === '' ? null : value;

		this.setState({
			selectedState,
		});
	};

	render() {
		const {person, stateToPeople, selectedState} = this.state;

		return (
			<div>
				<InputSearch onTextChange={this.onTextChange}/>
				<SelectState stateToPeople={stateToPeople}
										 selectValue={selectedState}
										 onHandleChange={this.onHandleChange}/>
				<UserTable people={this.filteredPeopleSelector(this.state)}
									 onRowClick={this.onRowClick}
									 sortByColumns={this.sortByColumns}/>
				{person && <UserInfo person={person}/>}
			</div>
		)
	}
}