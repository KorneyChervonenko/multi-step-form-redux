// import { useState } from 'react';
import { useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider, redirect } from 'react-router';
import Header from './components/Header.jsx';
import PersonInfo from './pages/PersonInfo/PersonInfo.jsx';
import SelectPlan from './pages/SelectPlan/SelectPlan.jsx';
import Addons from './pages/Addons/Addons.jsx';
import Summary from './pages/Summary/Summary.jsx';
import Success from './pages/Success/Success.jsx';

import './App.scss';

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
			</div>
		</div>
	);
}

export default App;
