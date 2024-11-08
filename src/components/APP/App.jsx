import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
// Импорт компонентов
import { Footer, Header, Sidebar } from '../index';

// Импорт роутинга
import AppRoutes from '../Routes/Routes';

// импорт запроса с redux
import { fetchCategories } from '../../redux/categories/categoriesSlice';

const App = () => {
	const dispatch = useDispatch()

	// Отправляем в наш redux (state) 
	useEffect(() => {
		dispatch(fetchCategories());
		// следим за диспатчем
	},[dispatch])


	return (
		<div className='app'>
			<Header />
			<div className='container'>
				<Sidebar />
				<AppRoutes />
			</div>
			<Footer />
		</div>
	);
};

export default App;
