// (Routes маршруты) (Route маршрут)
import { Routes, Route } from 'react-router-dom';

import { ROUTES } from '../../utils/routes';

import { Home, SingleProduct, Profile } from '../index';

// Роутинг по страницам
const AppRouter = () => {
	return (
		<Routes>
			<Route index element={<Home />} />
			<Route path={ROUTES.CATEGORY} element={<SingleProduct />} />
			<Route path={ROUTES.PRODUCT} element={<SingleProduct />} />
			<Route path={ROUTES.PROFILE} element={<Profile />} />
		</Routes>
	);
};

export default AppRouter;
