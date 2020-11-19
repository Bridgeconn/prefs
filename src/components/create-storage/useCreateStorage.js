import React, { useEffect } from 'react';

export default function useCreateStorage(key, values, backend) {

	// const { result, setResult } = useState();
	const { result } = backend.createNew(key, values);
	// const validation = validator('name', values.username);
	// console.log(result);
	// useEffect(() => {
	// 	console.log('useEffect');
	// 	setResult(backend.createNew(key, values));
	// }, [key, values]);
	return { result };
}
