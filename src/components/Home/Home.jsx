import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

// Достали функцию фильтрации продукта
import { filteredByPrice } from '../../redux/products/productsSlice';

import { Poster, Products, Categories, Banner } from '../index';

const Home = () => {
	const dispatch = useDispatch();

	const { list, filtered, categories } = useSelector(state => ({
		list: state.products.list,
		filtered: state.products.filtered,
		categories: state.categories.list,
	}));

	useEffect(() => {
		if (list.length > 0) {

			// Передали в функцию фильтрации стоимость
			dispatch(filteredByPrice(100));
		}
	}, [dispatch, list.length, list]);

	return (
		<>
			<Poster />
			<Products products={list} amount={5} title='One' />
			<Categories products={categories} amount={5} title='Two' />
			<Banner />
			<Products products={filtered} amount={5} title='Three' />
		</>
	);
};

export default Home;
