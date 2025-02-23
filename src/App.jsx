// import { useState } from 'react';
import { createBrowserRouter, RouterProvider, redirect } from 'react-router';
import Header from './components/Header.jsx';
// import PageNav from './components/PageNav.jsx';

import PersonInfo from './pages/PersonInfo/PersonInfo.jsx';
import SelectPlan from './pages/SelectPlan/SelectPlan.jsx';
import Addons from './pages/Addons/Addons.jsx';
import Summary from './pages/Summary/Summary.jsx';
import Success from './pages/Success/Success.jsx';

import './App.scss';
// import { Provider } from 'react-redux';
// import store from './store.js';
import { useSelector } from 'react-redux';
// const isSuccessful = useSelector((store) => store.summary.isSuccessful);

// const router = createBrowserRouter([
// 	{ path: 'personal-info', element: isSuccessful ? <Success /> : <PersonInfo /> },
// ]);

function App() {
	const isSuccessful = useSelector((store) => store.summary.isSuccessful);
	const router = createBrowserRouter([
		{ path: '/', loader: () => redirect('personal-info') },
		{ path: 'personal-info', element: isSuccessful ? <Success /> : <PersonInfo /> },
		{ path: 'select-plan', element: isSuccessful ? <Success /> : <SelectPlan /> },
		{ path: 'add-ons', element: isSuccessful ? <Success /> : <Addons /> },
		{ path: 'summary', element: isSuccessful ? <Success /> : <Summary /> },
	]);

	return (
		<div className="app">
			<div className="main">
				<Header />
				<RouterProvider router={router} />
				{/* <BrowserRouter>
					<PageNav />
					<Routes>
						<Route index element={<Navigate replace to="personal-info" />} />
						<Route path="personal-info" element={isSuccessful ? <Success /> : <PersonInfo />} />
						<Route path="select-plan" element={isSuccessful ? <Success /> : <SelectPlan />} />
						<Route path="add-ons" element={isSuccessful ? <Success /> : <Addons />} />
						<Route path="summary" element={isSuccessful ? <Success /> : <Summary />} />
					</Routes>
				</BrowserRouter> */}
			</div>
		</div>
	);
}

export default App;
