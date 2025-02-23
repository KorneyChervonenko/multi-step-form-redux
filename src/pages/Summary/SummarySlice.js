import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isSuccessful: false,
};

const summarySlice = createSlice({
	name: 'summary',
	initialState,
	reducers: {
		markSuccessful(state) {
			state.isSuccessful = true;
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

export default summarySlice.reducer;
export const { markSuccessful } = summarySlice.actions;
