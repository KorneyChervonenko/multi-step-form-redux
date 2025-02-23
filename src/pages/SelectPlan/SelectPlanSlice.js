import { createSlice } from '@reduxjs/toolkit';
import { CONFIG } from '../../config.mjs';

const initialState = {
	// selectedPlan: CONFIG.plans.at(0),
	selectedPlan: Object.keys(CONFIG.plans).at(0),
	isMonthly: true,
};

const selectPlanSlice = createSlice({
	name: 'plan',
	initialState,
	reducers: {
		selectPlan(state, action) {
			if (Object.keys(CONFIG.plans).includes(action.payload)) state.selectedPlan = action.payload;
		},

		togglePeriod(state) {
			state.isMonthly = !state.isMonthly;
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

export default selectPlanSlice.reducer;
export const { selectPlan, togglePeriod } = selectPlanSlice.actions;
