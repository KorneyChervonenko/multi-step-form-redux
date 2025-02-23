import { configureStore } from '@reduxjs/toolkit';

import personInfoReducer from './pages/PersonInfo/PersonInfoSlice';
import addonsReducer from './pages/Addons/AddonsSlice';
import planReducer from './pages/SelectPlan/SelectPlanSlice';
import summaryReducer from './pages/Summary/SummarySlice';

const store = configureStore({
	reducer: {
		personInfo: personInfoReducer,
		addons: addonsReducer,
		plan: planReducer,
		summary: summaryReducer,
	},
});

export default store;
