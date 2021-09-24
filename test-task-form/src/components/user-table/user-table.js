import React from 'react';

import "./user-table.css";

const UserTable = ({people, onClickRow}) => {
	const imgSort = <span className="material-icons arrow-drop-down">arrow_drop_down</span>;

	const renderPeople = () => {
		return people.map(person => {
			const {id, firstName, lastName, email, phone, adress: {state}} = person;

			return (
				<tr key={phone} onClick={() => onClickRow(person)}>
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

	return (
		<table>
			<thead>
			<tr>
				<th>id {imgSort}</th>
				<th>First Name {imgSort}</th>
				<th>Last Name {imgSort}</th>
				<th>Email {imgSort}</th>
				<th>Phone {imgSort}</th>
				<th>State {imgSort}</th>
			</tr>
			</thead>
			<tbody>
			{renderPeople()}
			</tbody>
		</table>
	)
};

export default UserTable;