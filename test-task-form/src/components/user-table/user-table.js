import React, {Component} from 'react';

import "./user-table.css";

export default class UserTable extends Component {
	state = {
		columnKey: null,
		isAsc: true,
	}

	renderPeople = () => {
		const {people, onRowClick} = this.props;

		return this.orderPeople(people).map(person => {
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
		this.setState({
			columnKey: key,
			isAsc: this.state.columnKey === key ? !this.state.isAsc : true,
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

	render() {
		let rotate = this.state.isAsc ? '0' : '180';

		const style = {
			transform: `rotate(${rotate}deg)`
		}

		const imgSort = <span className="material-icons arrow-drop-up"
													style={style}>arrow_drop_up</span>;

		return (
			<table>
				<thead>
				<tr>
					<th onClick={() => this.selectColumn('id')}> id {imgSort}</th>
					<th onClick={() => this.selectColumn('firstName')}> First Name {imgSort}</th>
					<th onClick={() => this.selectColumn('lastName')}> Last Name {imgSort}</th>
					<th onClick={() => this.selectColumn('email')}> Email {imgSort}</th>
					<th onClick={() => this.selectColumn('phone')}> Phone {imgSort}</th>
					<th onClick={() => this.selectColumn('state')}> State {imgSort}</th>
				</tr>
				</thead>
				<tbody>
				{this.renderPeople()}
				</tbody>
			</table>
		)
	}
};