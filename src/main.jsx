import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import './index.scss'
import App from './App.jsx';
import { FormContextProvider } from './contexts/FormContext.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<FormContextProvider>
			<App />
		</FormContextProvider>
	</StrictMode>
);
