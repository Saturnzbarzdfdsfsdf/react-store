import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
// Импорт компонентов
import { Footer, Header, Sidebar, UserForm } from '../index';

// Импорт роутинга
import AppRoutes from '../Routes/Routes';

// импорт запроса с redux
import { fetchCategories } from '../../redux/categories/categoriesSlice';
import { fetchProducts } from '../../redux/products/productsSlice';

const App = () => {
	const dispatch = useDispatch();

	// Отправляем categories в наш redux (state)
	useEffect(() => {
		dispatch(fetchCategories());
		dispatch(fetchProducts());
		// следим за диспатчем
	}, [dispatch]);

	return (
		<div className='app'>
			<Header />
			<UserForm />
			<div className='container'>
				<Sidebar />
				<AppRoutes />
			</div>
			<Footer />
		</div>
	);
};

export default App;
