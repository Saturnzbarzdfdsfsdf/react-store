import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetProductsQuery } from '../../redux/api/apiSlice';

import styles from './Category.module.css';
import Products from '../Products/Products';
import { useSelector } from 'react-redux';

const Category = () => {
	const { id } = useParams();
	const { list } = useSelector(({ categories }) => categories);

	const defaultValues = {
		title: '',
		price_min: 0,
		price_max: 0,
	};
	const defaultParams = {
		categoryId: id,
		limit: 5,
		offset: 0,
		...defaultValues,
	};

	// заголовок категорий
	const [title, setTitle] = useState('');
	// пагинация
	const [pagination, setPagination] = useState([]);

	const [values, setValues] = useState(defaultValues);
	const [params, setParams] = useState(defaultParams);

	const { data, isLoading, isSuccess } = useGetProductsQuery(params);

	// Пагинация
	useEffect(() => {
		if (!isLoading) return;
		if (!Array.isArray(data)) return;

		const products = data;

		console.log('Products to add:', products);

		if (!data.length) return;

		setPagination(pagination => [...pagination, ...products]);
		
	}, [data, isLoading]);

	useEffect(() => {
		if (!id) return;

		setParams({ ...defaultParams, categoryId: id });
	}, [id]);

	useEffect(() => {
		if (!id || !list.length) return;

		const { name } = list.find(item => item.id === id * 1);
		setTitle(name);
	}, [list, id]);

	// Функция для загрузки дополнительных данных
	const loadMoreProducts = () => {
		setParams(prevParams => ({
			...prevParams,
			offset: prevParams.offset + prevParams.limit,
		}));
	};

	const handleChange = ({ target: { value, name } }) => {
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = e => {
		e.preventDefault();

		setParams({ ...params, ...values });
	};

	return (
		<section className={styles.wrapper}>
			<h2 className={styles.title}>{title}</h2>

			<form className={styles.filters} onSubmit={handleSubmit}>
				<div className={styles.filter}>
					<input
						type='text'
						name='title'
						onChange={handleChange}
						value={values.title}
						placeholder='Product name'
					/>

					<input
						type='number'
						name='price_min'
						onChange={handleChange}
						value={values.price_min}
						placeholder='0'
					/>

					<input
						type='number'
						name='price_max'
						onChange={handleChange}
						value={values.price_max}
						placeholder='0'
					/>
				</div>
				<button type='submit' hidden />
			</form>

			{isLoading ? (
				<div className='preloader'>Loading...</div>
			) : !isSuccess || !data.length ? (
				<div className={styles.back}>
					<span>NoResults</span>
					<button>Reset</button>
				</div>
			) : (
				<Products
					title=''
					products={data}
					style={{ padding: 0 }}
					amount={data.length}
				/>
			)}

			<div className={styles.more}>
				<button onClick={loadMoreProducts}>Search More</button>
			</div>
		</section>
	);
};

export default Category;


