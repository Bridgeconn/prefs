import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
// import PropTypes from 'prop-types';
// import { CreateStorage, UpdateStorage, DeleteStorage } from './useLocalStorage';
import useUpdateStorage from './useUpdateStorage';
import useValidation from '../../utils/validation/useValidation';
import * as backend from '../../utils/backend/core';
const UpdateStorage = () => {
	const [values, setValues] = useState({
		username: '',
		email: '',
	});
	const [error, setError] = useState({
		username: {},
		email: {},
	});
	// const [result, setResult] = useState();
	const { initialValue, result } = useUpdateStorage('users', values, backend);
	console.log('initialValue', initialValue, result);
	useEffect(() => {
		setValues({
			...values,
			username: initialValue.username,
			email: initialValue.email,
		});
	}, [initialValue]);
	useEffect(() => {
		if (values.username) {
			setError({
				...error,
				username: useValidation('name', values.username),
			});
		}
		if (values.email) {
			setError({
				...error,
				email: useValidation('email', values.email),
			});
		}
	}, [values]);
	const handleSubmit = () => {
		if (error.username.valid && error.email.valid) {
			useUpdateStorage('users', values, backend);
		}
	};
	console.log('result', result);
	return (
		<div>
			<h4>Name</h4>
			<TextField
				error={error.username.result}
				value={values.username}
				helperText={error.username.result}
				onChange={(e) => {
					setValues({ ...values, username: e.target.value });
				}}
			/>
			<h4>Email</h4>
			<TextField
				error={error.email.result}
				value={values.email}
				helperText={error.email.result}
				onChange={(e) => {
					setValues({ ...values, email: e.target.value });
				}}
			/>
			<Button variant='contained' onClick={handleSubmit}>
				Submit
			</Button>
			<h3>{error ? '' : result}</h3>
		</div>
	);
};
// UpdateTest.propTypes = {
// 	/** @ignore */
// 	/** Type a key for storing in LocalStorage. */
// 	// key: PropTypes.string.isRequired,
// 	/** Type a name. */
// 	value: PropTypes.string.isRequired,
// };
export default UpdateStorage;
