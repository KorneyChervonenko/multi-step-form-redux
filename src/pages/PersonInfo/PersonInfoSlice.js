import { createSlice } from '@reduxjs/toolkit';

// const initPersonData = {
// 	name: 'Stephen King',
// 	email: 'stephenking@lorem.com',
// 	tel: '+1 234 567 890',
// };

const initErrors = {
	name: 'This field is required',
	email: 'This field is required',
	tel: 'This field is required',
};

const initPersonData = {
	name: '',
	email: '',
	tel: '',
};

const initialState = {
	person: { ...initPersonData },
	personFormErrors: { ...initErrors },
};

const personInfoSlice = createSlice({
	name: 'personInfo',
	initialState,
	reducers: {
		changeInput(state, action) {
			const [name, value] = action.payload;
			state.person[name] = value;
			state.personFormErrors[name] = '';
		},

		updateErrorMessages(state, action) {
			state.personFormErrors = action.payload;
		},
	},
});

export default personInfoSlice.reducer;
export const { changeInput, updateErrorMessages } = personInfoSlice.actions;
