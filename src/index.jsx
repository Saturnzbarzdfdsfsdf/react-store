import React from 'react';
import ReactDOM from 'react-dom/client';

// Обернули наше app
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './redux/store.js';

import App from './components/App/App.jsx';

import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	// <React.StrictMode>
		<BrowserRouter
			future={{
				v7_relativeSplatPath: true,
			}}
		>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	// </React.StrictMode>
);
