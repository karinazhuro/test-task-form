const Pagination = ({quantityPages, onPaginationPageClick}) => {
	const renderButtonPages = () => {
		const arrBtn = [];

		for (let i = 1; i <= quantityPages; i++) arrBtn.push(i);

		return arrBtn.map(num => {
			return <button key={num}
										 value={num}
										 onClick={() => onPaginationPageClick(num)}>{num}</button>
		});
	};

	return (
		<div>
			<button onClick={() => onPaginationPageClick('-1')}>Previous</button>
			{renderButtonPages()}
			<button onClick={() => onPaginationPageClick('+1')}>Next</button>
		</div>
	)
};

export default Pagination;