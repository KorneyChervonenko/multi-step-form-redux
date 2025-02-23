import { createSlice } from '@reduxjs/toolkit';
import { CONFIG } from '../../config.mjs';

// const initAddonStates = {
// 	'online-service': true,
// 	'larger-storage': true,
// 	'customizable-profile': true,
// 	// 'customizable-profile': false,
// };

const initAddonStates = Object.fromEntries(
	Object.keys(CONFIG.addons).map((addonUrl) => [addonUrl, true])
);

const initialState = {
	addonStates: { ...initAddonStates },
};

const addonsSlice = createSlice({
	name: 'addons',
	initialState,
	reducers: {
		toggleAddon(state, action) {
			state.addonStates[action.payload] = !state.addonStates[action.payload];
		},

		// changeTaskTitle: {
		// 	prepare(task, newTtile) {
		// 		return {
		// 			payload: { task, newTtile },
		// 		};
		// 	},

		// 	reducer(state, action) {
		// 		state.tasks = state.tasks.map((task) =>
		// 			task.id === action.payload.task.id ? { ...task, title: action.payload.newTitle } : task
		// 		);
		// 	},
		// },
	},
});

export default addonsSlice.reducer;
export const { toggleAddon } = addonsSlice.actions;
