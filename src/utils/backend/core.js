export function getValue(key) {
	const valueSaved = JSON.parse(localStorage.getItem(key));
	console.log(valueSaved);
	if (valueSaved) return valueSaved;
	return null;
}

export function createNew(key, propValues) {
	console.log('create', key, propValues);
	let result;
	if (!getValue(key)) {
		try {
			localStorage.setItem(key, JSON.stringify(propValues));
			result = 'Successfully Created';
		} catch (error) {
			result = error;
		}
	} else {
		result = 'Failed! Key already exist.';
	}
	console.log(result, propValues);
	return { result, propValues };
}

export function updateValue(key, propValues) {
	let result;
	try {
		localStorage.setItem(key, JSON.stringify(propValues));
		result = 'Successfully Updated';
	} catch (error) {
		result = error;
	}
	return result;
}
export function removeStorage(key) {
	let result = 'Failed! Wrong key.';
	try {
		localStorage.removeItem(key);
		result = 'Successfully Deleted';
	} catch (err) {
		result = err;
	}
	return result;
}
