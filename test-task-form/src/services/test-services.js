import {Component} from "react";

export default class TestServices extends Component {
	_apiUrl = `https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json`;

	getPeople = () => fetch(this._apiUrl).then(res => res.json());
};