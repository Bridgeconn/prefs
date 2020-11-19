import { validEmailRegex } from './helper';

export default function useValidation(name, value) {
	console.log('validation', name, value);
	let valid, result;

	switch (name) {
		case 'name':
			if (value.length < 5) {
				result = 'Full Name must be 5 characters long!';
				valid = false;
			} else {
				result = '';
				valid = true;
			}
			break;
		case 'email':
			if (!validEmailRegex.test(value)) {
				result = 'Email is not valid!';
				valid = false;
			} else {
				result = '';
				valid = true;
			}
			break;
		default:
			break;
	}
	return { name, result, valid };
}
