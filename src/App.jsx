// import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import Header from './components/Header.jsx';
import PageNav from './components/PageNav.jsx';

import PersonInfo from './pages/PersonInfo/PersonInfo.jsx';
import SelectPlan from './pages/SelectPlan/SelectPlan.jsx';
import Addons from './pages/Addons/Addons.jsx';
import Summary from './pages/Summary/Summary.jsx';
import Success from './pages/Success/Success.jsx';

import './App.scss';
// import { Provider } from 'react-redux';
// import store from './store.js';
import { useSelector } from 'react-redux';

function App() {
	const isSuccessful = useSelector((store) => store.summary.isSuccessful);

	return (
		<div className="app">
			<div className="main">
				<Header />
				<BrowserRouter>
					<PageNav />
					<Routes>
						<Route index element={<Navigate replace to="personal-info" />} />
						<Route path="personal-info" element={isSuccessful ? <Success /> : <PersonInfo />} />
						<Route path="select-plan" element={isSuccessful ? <Success /> : <SelectPlan />} />
						<Route path="add-ons" element={isSuccessful ? <Success /> : <Addons />} />
						<Route path="summary" element={isSuccessful ? <Success /> : <Summary />} />
						{/* <Route path="success" element={<Success />} /> */}
					</Routes>
				</BrowserRouter>
			</div>
		</div>
	);
}

export default App;
