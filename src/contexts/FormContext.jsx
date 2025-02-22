import { createContext, useContext, useReducer, useState } from 'react';

const FormContext = createContext();

// const initPersonData = {
// 	name: 'Stephen King',
// 	email: 'stephenking@lorem.com',
// 	tel: '+1 234 567 890',
// };

const initPersonData = {
	name: '',
	email: '',
	tel: '',
};

const initAddonStates = {
	'online-service': true,
	'larger-storage': true,
	'customizable-profile': true,
	// 'customizable-profile': false,
};

// const initAddonStates = {
// 	'online-service': false,
// 	'larger-storage': false,
// 	'customizable-profile': false,
// };

const initErrors = {
	name: 'This field is required',
	email: 'This field is required',
	tel: 'This field is required',
};

const initialState = {
	isSuccessful: false,
	person: initPersonData,
	personFormErrors: initErrors,
	plan: 'arcade',
	isMonthly: true,
	addonStates: initAddonStates,
};

function reducer(state, action) {
	switch (action.type) {
		case 'mark as successful':
			return { ...state, isSuccessful: true };

		case 'change input': {
			// const [name, value] = action.payload;
			const { name, value } = action.payload;
			return {
				...state,
				person: { ...state.person, [name]: value },
				personFormErrors: { ...state.personFormErrors, [name]: '' },
			};
		}

		case 'update error messages':
			return { ...state, personFormErrors: action.payload };

		case 'set plan':
			return { ...state, plan: action.payload };

		case 'switch period':
			return { ...state, isMonthly: !state.isMonthly };

		case 'select addon':
			return {
				...state,
				addonStates: { ...state.addonStates, [action.payload]: !state.addonStates[action.payload] },
			};

		default:
			throw new Error('Unknown action type');
	}
}

// eslint-disable-next-line react/prop-types
function FormContextProvider({ children }) {
	const [{ isSuccessful, person, personFormErrors, plan, isMonthly, addonStates }, dispatch] =
		useReducer(reducer, initialState);

	// const [isMonthly, setIsMonthly] = useState(true);
	// const [plan, setPlan] = useState('arcade');
	// const [addons, setAddonsStatus] = useState(initAddonsStatus);

	return (
		<FormContext.Provider
			value={{ isSuccessful, person, personFormErrors, isMonthly, plan, addonStates, dispatch }}
		>
			{children}
		</FormContext.Provider>
	);
}

function useFormContext() {
	const context = useContext(FormContext);
	if (context === undefined)
		throw new Error('FormContext was used outside the FormContextProvider');
	return context;
}

export { useFormContext, FormContextProvider };
