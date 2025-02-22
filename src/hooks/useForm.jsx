import { useState } from 'react';

export default function useForm(initFormData, validateForm, onSubmitCall) {
	const [formData, setFormData] = useState(initFormData);
	const [formErrors, setFormErrors] = useState({});

	function handleChange(e) {
		setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
		setFormErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: '' }));
	}

	function handleSubmit(e) {
		e.preventDefault();
		// console.log('submit pressed');
		const inputFields = [...e.target.elements].filter((element) => element.tagName === 'INPUT');
		const errors = validateForm(inputFields);
		setFormErrors(errors);
		if (Object.keys(errors).length === 0) onSubmitCall();
	}

	return { formData, formErrors, handleChange, handleSubmit };
}
