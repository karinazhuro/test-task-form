import React, {Component} from 'react';

import Pagination from "../pagination";

import "./user-table.css";

export default class UserTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			columnKey: null,
			isAsc: true,

			personPerPage: 20,
			quantityPages: 0,
			currentPage: 1,

			columnHeaders: {
				id: 'Id',
				firstName: 'First Name',
				lastName: 'Last Name',
				email: 'Email',
				phone: 'Phone',
				state: 'State',
			}
		}

		this.onPaginationPageClick = this.onPaginationPageClick.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({quantityPages: nextProps.people.length / this.state.personPerPage})
	}

	getPeoplePerPage = (people) => {
		const {currentPage, personPerPage} = this.state;
		const lastPeopleIndex = currentPage * personPerPage;
		const firstPeopleIndex = lastPeopleIndex - personPerPage;

		return people.slice(firstPeopleIndex, lastPeopleIndex)
	};

	renderPeople = () => {
		const {people, onRowClick} = this.props;

		return this.getPeoplePerPage(this.orderPeople(people)).map(person => {
			const {id, firstName, lastName, email, phone, adress: {state}} = person;

			return (
				<tr key={phone} onClick={() => onRowClick(person)}>
					<td>{id}</td>
					<td>{firstName}</td>
					<td>{lastName}</td>
					<td>{email}</td>
					<td>{phone}</td>
					<td>{state}</td>
				</tr>
			)
		});
	};

	selectColumn = (key) => {
		const {columnKey, isAsc} = this.state;

		this.setState({
			columnKey: key,
			isAsc: columnKey === key ? !isAsc : true,
		})
	};

	orderPeople = (people) => {
		const {columnKey, isAsc} = this.state;

		const flattenPerson = (person) => {
			const {id, firstName, lastName, email, phone, adress: {state}} = person;

			return {
				id,
				firstName,
				lastName,
				email,
				phone,
				state
			}
		};

		const compare = (a, b) => {
			if (a[columnKey] < b[columnKey]) return -1;
			if (a[columnKey] > b[columnKey]) return 1;
			return 0;
		};

		return [...people].sort((a, b) => {
			a = flattenPerson(a);
			b = flattenPerson(b);

			return isAsc ? compare(a, b) : compare(b, a);
		});
	}

	renderHeaderCell = (columnKey, label) => {
		let rotate = this.state.isAsc && this.state.columnKey === columnKey ? '0' : '180';

		const style = {
			transform: `rotate(${rotate}deg)`
		};

		const imgSort = <span className="material-icons arrow-drop-up"
													style={style}>arrow_drop_up</span>;

		return (<th className={columnKey}
								key={columnKey}
								onClick={() => this.selectColumn(columnKey)}> {label} {imgSort}</th>)

	};


	onPaginationPageClick(num) {
		const {quantityPages} = this.state;

		if (num < 1 || num > quantityPages) return;

		this.setState({
			currentPage: num,
		});
	};

	render() {
		const {quantityPages, currentPage} = this.state;

		return (
			<React.Fragment>
				<table>
					<thead>
					<tr className="table-head">
						{Object.entries(this.state.columnHeaders).map(([key, value]) => {
							return this.renderHeaderCell(key, value);
						})}
					</tr>
					</thead>
					<tbody>
					{this.renderPeople()}
					</tbody>
				</table>

				<Pagination quantityPages={quantityPages}
										currentPage={currentPage}
										onPaginationPageClick={this.onPaginationPageClick}/>
			</React.Fragment>
		)
	}
};