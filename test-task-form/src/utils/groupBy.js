function groupBy(array, keySelector) {
	const map = {};

	array.forEach((item) => {
		const key = keySelector(item);

		(map[key] = map[key] ?? []).push(item)
	});

	return map;
}

export default groupBy;