import '../index.scss';
import styles from './PersonInfo.module.scss';
import { useNavigate } from 'react-router';
import { useFormContext } from '../contexts/FormContext';
import classNames from 'classnames';
import PrevBtn from '../components/PrevBtn';
import NextBtn from '../components/NextBtn';

function validateForm(inputFields) {
	//  { valueMissing: true, typeMismatch: false, patternMismatch: false, tooLong: false, tooShort: false,
	// rangeUnderflow: false, rangeOverflow: false, stepMismatch: false, badInput: false, customError: false }
	let errors = {};
	inputFields.forEach((field) => {
		// console.log(field.validity);
		// console.log(field.name);
		if (!field.validity.valid) {
			switch (true) {
				case field.validity.valueMissing:
					errors[field.name] = 'This field is required';
					break;

				case field.validity.tooShort:
					errors[field.name] = 'Too short';
					break;

				case field.validity.typeMismatch:
					errors[field.name] = field.validationMessage;
					break;

				case field.validity.patternMismatch:
					errors[field.name] = field.validationMessage;
					break;

				default:
					errors[field.name] = field.validationMessage;
					break;
			}
		}
	});
	return errors;
}

export default function PersonInfo() {
	const navigate = useNavigate();
	const { person, personFormErrors, dispatch } = useFormContext();

	// console.log(personFormErrors);

	function handleChange(e) {
		dispatch({ type: 'change input', payload: e.target });
	}

	function handleSubmit(e) {
		e.preventDefault();
		// console.log('submit pressed');
		// console.log(e.target.form.elements);

		const inputFields = [...e.target.form.elements].filter(
			(element) => element.tagName === 'INPUT'
		);
		const errors = validateForm(inputFields);
		dispatch({ type: 'update error messages', payload: errors });
		if (Object.keys(errors).length === 0) navigate('/select-plan');
	}

	return (
		<section className={styles.personInfo}>
			<form
				id="formPersonInfo"
				className={classNames('form-area', styles.formPersonInfo)}
				// onSubmit={handleSubmit}
				noValidate
			>
				<header>
					<h2>Personal info</h2>
					<p className="plain-text">Please provide your name, email address, and phone number.</p>
				</header>
				<fieldset className={styles.fieldset}>
					<label className={styles.label}>
						<span className={styles.labelText}>
							<span>Name</span>
							<span className={styles.errMsg} id="name-err">
								{personFormErrors['name']}
							</span>
						</span>
						<input
							// className={styles.inputField}
							className={`${styles.inputField} ${
								personFormErrors['name']?.length > 0 && 'red-border'
							}`}
							value={person.name}
							onChange={handleChange}
							name="name"
							type="text"
							minLength="4"
							placeholder="e.g. Stephen King"
							aria-errormessage="name-err"
							required
						/>
					</label>
					<label className={styles.label}>
						<span className={styles.labelText}>
							<span>Email Address</span>
							<span className={styles.errMsg} id="email-err">
								{personFormErrors['email']}
							</span>
						</span>
						<input
							// className={styles.inputField}
							className={`${styles.inputField} ${
								personFormErrors['email']?.length > 0 && 'red-border'
							}`}
							value={person.email}
							onChange={handleChange}
							name="email"
							type="email"
							placeholder="e.g. stephenking@lorem.com"
							aria-errormessage="email-err"
							required
						/>
					</label>
					<label className={styles.label}>
						<span className={styles.labelText}>
							<span>Phone Number</span>
							<span className={styles.errMsg} id="phone-err">
								{personFormErrors['tel']}
							</span>
						</span>
						<input
							// className={styles.inputField}
							className={`${styles.inputField} ${
								personFormErrors['tel']?.length > 0 && 'red-border'
							}`}
							value={person.tel}
							onChange={handleChange}
							name="tel"
							type="tel"
							placeholder="e.g. +1 234 567 890"
							pattern="\+[0-9]{1} [0-9]{3} [0-9]{3} [0-9]{3}"
							aria-errormessage="phone-err"
							required
						/>
					</label>
				</fieldset>
			</form>
			<menu className="prev-next-buttons">
				<PrevBtn />
				<NextBtn bindForm="formPersonInfo" handleClick={handleSubmit} />
			</menu>
		</section>
	);
}
