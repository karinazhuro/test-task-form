import React, {Component} from 'react';

import InputSearch from "../input-searching";
import SelectState from "../select-state";
import UserTable from "../user-table";
import Pagination from "../pagination";
import UserInfo from "../user-info";

import ItrexServices from "../../services/itrex-services";
import groupBy from "../../utils/groupBy";

import "./app.css";

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			people: [],
			person: null,

			inputSearchValue: '',
			stateToPeople: {},
			selectedState: null,

			personPerPage: 20,
			quantityPages: 0,
			currentPage: 1,
		};

		this.onTextChange = this.onTextChange.bind(this);
		this.onRowClick = this.onRowClick.bind(this);
		this.onHandleChange = this.onHandleChange.bind(this);
		this.onPaginationPageClick = this.onPaginationPageClick.bind(this);
	}

	itrexServices = new ItrexServices();

	componentDidMount() {
		this.init()
	}

	async init() {
		const people = await this.itrexServices.getPeople();
		const stateToPeople = groupBy(people, (person) => person.adress.state);
		const quantityPages = people.length / this.state.personPerPage;

		this.setState({
			people,
			stateToPeople,
			quantityPages,
		})
	}

	onTextChange(e) {
		const inputSearchValue = e.target.value;

		this.setState({
			inputSearchValue,
		})
	};

	filteredPeopleSelector(state) {
		const {people, inputSearchValue, stateToPeople, selectedState, personPerPage, currentPage} = state;
		const containsName = (name) => {
			return name.toLowerCase().startsWith(inputSearchValue.trim().toLowerCase());
		};
		const sortedPeople = selectedState ? stateToPeople[selectedState] : people;

		const lastPeopleIndex = currentPage * personPerPage;
		const firstPeopleIndex = lastPeopleIndex - personPerPage;
		const currentPeople = people.slice(firstPeopleIndex, lastPeopleIndex)

		if (inputSearchValue === '' && selectedState === null) return currentPeople;

		return currentPeople.filter(value => containsName(value.firstName) || containsName(value.lastName));
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

	onPaginationPageClick(num) {
		const {currentPage, quantityPages} = this.state;
		let page = currentPage;

		if (num === '-1') page -= 1;
		if (num === '+1') page += 1;
		else page = num;

		if (page < 1 || page > quantityPages) return;

		this.setState({
			currentPage: page,
		});
	};

	render() {
		const {person, stateToPeople, selectedState, quantityPages} = this.state;

		return (
			<div className="wrapper">
				<div className="setting">
					<InputSearch onTextChange={this.onTextChange}/>
					<SelectState stateToPeople={stateToPeople}
											 selectValue={selectedState}
											 onHandleChange={this.onHandleChange}/>
				</div>
				<UserTable people={this.filteredPeopleSelector(this.state)}
									 onRowClick={this.onRowClick}
									 sortByColumns={this.sortByColumns}/>
				<Pagination quantityPages={quantityPages}
										onPaginationPageClick={this.onPaginationPageClick}/>
				{person && <UserInfo person={person}/>}
			</div>
		)
	}
}