// (Routes маршруты) (Route маршрут)
import { Routes, Route } from 'react-router-dom';

// import { ROUTES } from '../../../utils/routes';

import Home from '../Home/Home';


// Роутинг по страницам
const AppRouter = () => {
	return (
		<Routes>
			<Route index element={<Home />} />
			{/* <Route path={ROUTES.CATEGORY} element={<SingleProduct />} /> */}
			{/* <Route path={ROUTES.PRODUCT} element={<SingleProduct />} /> */}
		</Routes>
	);
};

export default AppRouter;
