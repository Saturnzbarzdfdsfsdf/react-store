import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

// redux api slice
import { useGetProductQuery } from '../../redux/api/apiSlice';
import { getRelatedProducts } from '../../redux/products/productsSlice';

import { ROUTES } from '../../utils/routes';

// components
import { Product, Products } from '../index';

const SingleProduct = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	// Позже изменить,  достаю весь продукт
	const { list, related } = useSelector(({ products }) => products);

	// isLoading, isFetching, isSuccess встроено в apiSlice
	const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });

	// навигация при неуспешной загрузке данных
	useEffect(() => {
		if (!isFetching && !isLoading && !isSuccess) {
			navigate(ROUTES.HOME);
		}
	}, [isLoading, isFetching, isSuccess, navigate]);

	// получение связанных продуктов при успешной загрузке
	useEffect(() => {
		if (data && list.length) {
			dispatch(getRelatedProducts(data.category.id));
		}
	}, [data, dispatch, list.length]);

	if (!data) {
		return <section className='preloader'>Loading...</section>;
	}

	return (
		<>
			<Product {...data} />
			<Products products={related} amount={5} title='Related Products' />
		</>
	);
};

export default SingleProduct;
