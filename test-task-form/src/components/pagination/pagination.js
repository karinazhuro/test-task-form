import "./pagination.css";
import {Component} from "react";

export default class Pagination extends Component {
	renderButtonPages = (quantityPages, onPaginationPageClick) => {
		const arrBtn = [];

		for (let num = 1; num <= quantityPages; num++) {
			arrBtn.push(
				<button className="btn-pagination"
								key={num}
								value={num}
								onClick={() => onPaginationPageClick(num)}>{num}</button>
			);
		}

		return arrBtn;
	};

	render() {
		const {quantityPages, currentPage, onPaginationPageClick} = this.props;

		return (
			<div className="pagination">
				<button className="btn-pagination"
								onClick={() => onPaginationPageClick(currentPage -1)}>Previous
				</button>
				{this.renderButtonPages(quantityPages, onPaginationPageClick)}
				<button className="btn-pagination"
								onClick={() => onPaginationPageClick(currentPage +1)}>Next
				</button>
			</div>
		)
	}
};