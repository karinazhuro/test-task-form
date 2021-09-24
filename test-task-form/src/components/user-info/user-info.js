import "./user-info.css";

const UserInfo = ({person}) => {
	const {
		firstName, lastName,
		adress: {streetAddress, city, state, zip},
		description
	} = person;

	return (
		<div className="user-info">
			<h2>Profile info</h2>
			<ul>
				<li>Selected profile: {`${firstName} ${lastName}`}</li>
				<li>Description: {description}</li>
				<li>Address: {streetAddress}</li>
				<li>City: {city}</li>
				<li>State: {state}</li>
				<li>Index: {zip}</li>
			</ul>
		</div>
	)
};

export default UserInfo;