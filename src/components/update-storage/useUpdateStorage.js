import React, { useEffect } from 'react';

export default function useUpdateStorage(key, values, backend) {
	console.log('called');
	const [initialValue] = React.useState(backend.getValue(key));
	const [result, setResult] = React.useState();
	// const { result } = backend.updateValue(key, values);
	// const validation = validator('name', values.username);

	console.log(initialValue);
	useEffect(() => {
		setResult(backend.updateValue(key, values));
	}, [values]);
	return { initialValue, result };
}
