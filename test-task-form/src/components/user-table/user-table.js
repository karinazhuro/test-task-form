import React from 'react';

import "./user-table.css";

const UserTable = ({people}) => {
	const renderPeople = () => {
		return people.map(person => {
			const {id, firstName, lastName, email, phone, adress: {state}} = person;

			return (
				<tr key={phone} >
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
				<th>id</th>
				<th>First Name</th>
				<th>Last Name</th>
				<th>Email</th>
				<th>Phone</th>
				<th>State</th>
			</tr>
			</thead>
			<tbody>
			{renderPeople()}
			</tbody>
		</table>
	)
};

export default UserTable;