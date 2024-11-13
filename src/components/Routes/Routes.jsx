// (Routes маршруты) (Route маршрут)
import { Routes, Route } from 'react-router-dom';

import { ROUTES } from '../../utils/routes';

import { Home, SingleProduct, Profile, SingleCategory } from '../index';
import Cart from '../Cart/Cart';

// Роутинг по страницам
const AppRouter = () => {
	return (
		<Routes>
			<Route index element={<Home />} />
			<Route path={ROUTES.PRODUCT} element={<SingleProduct />} />
			<Route path={ROUTES.PROFILE} element={<Profile />} />
			<Route path={ROUTES.CATEGORY} element={<SingleCategory/>} />
			<Route path={ROUTES.CART} element={<Cart/>} />
		</Routes>
	);
};

export default AppRouter;
