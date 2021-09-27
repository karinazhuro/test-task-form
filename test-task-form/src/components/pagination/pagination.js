import "./pagination.css";

const Pagination = ({quantityPages, currentPage, onPaginationPageClick}) => {
	const renderButtonPages = () => {
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

	return (
		<div className="pagination">
			<button className="btn-pagination"
							onClick={() => onPaginationPageClick(currentPage - 1)}>Previous
			</button>
			{renderButtonPages()}
			<button className="btn-pagination"
							onClick={() => onPaginationPageClick(currentPage + 1)}>Next
			</button>
		</div>
	)
}

export default Pagination;
