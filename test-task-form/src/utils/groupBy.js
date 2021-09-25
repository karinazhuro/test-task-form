function groupBy(array, keySelector) {
	const map = new Map();

	array.forEach((item) => {
		const key = keySelector(item);
		const collection = map.get(key);

		!collection ? map.set(key, [item]) : collection.push(item);
	});

	return map;
}

export default groupBy;