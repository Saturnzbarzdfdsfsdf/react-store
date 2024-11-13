import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';

// Импорт маршруты
import { ROUTES } from '../../utils/routes';

import { toggleForm } from '../../redux/user/userSlice';

import { useGetProductsQuery } from '../../redux/api/apiSlice';

// Импорт img
import LOGO from '../../assets/img/logo.svg';
import AVATAR from '../../assets/img/avatar.jpg';

import styles from './Header.module.css';

const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [searchValue, setSearchValue] = useState('');
	const { data, isLoading } = useGetProductsQuery({ title: searchValue });

	// Исправить
	const { currentUser, cart } = useSelector(({ user }) => user);

	console.log('cart top in header',cart);
	

	const [values, setValues] = useState({
		name: 'Guest',
		avatar: AVATAR,
	});

	useEffect(() => {
		if (!currentUser) return;

		setValues(currentUser);
	}, [currentUser]);

	// при клике по профилю навигация на профиль
	const handleClick = () => {
		if (!currentUser) {
			dispatch(toggleForm(true));
		} else {
			navigate(ROUTES.PROFILE);
		}
	};

		console.log('bool',!!cart.length);
		console.log('count', cart.length);

	const handleSearch = ({ target: { value } }) => {
		setSearchValue(value);
	};

	return (
		<div className={styles.header}>
			<div className={styles.logo}>
				<Link to={ROUTES.HOME}>
					<img src={LOGO} alt='logo' />
				</Link>
			</div>

			<div className={styles.info}>
				<div className={styles.user} onClick={handleClick}>
					<div
						className={styles.avatar}
						style={{ backgroundImage: `url(${values.avatar})` }}
					/>
					<div className={styles.username}>{values.name}</div>
				</div>
				<form className={styles.form}>
					<div className={styles.icon}>
						<svg className='icon'>
							<use xlinkHref={'sprite.svg#search'} />
						</svg>
					</div>
					<div className={styles.input}>
						<input
							type='search'
							name='search'
							placeholder='search for anything'
							autoCapitalize='on'
							value={searchValue}
							onChange={handleSearch}
						/>
					</div>

					{/*Условный рендеринг результатов поиска*/}
					{searchValue && (
						<div className={styles.box}>
							{isLoading // if
								? 'Loading' //else if
								: !data.length //else if
								? 'No results' //else if
								: data.map(({ title, images, id }) => {
										return (
											<Link
												onClick={() => setSearchValue('')}
												className={styles.item}
												to={`products/${id}`}
												key={id}
											>
												<div
													className={styles.image}
													style={{ backgroundImage: `url(${images[0]})` }}
												></div>
												<div className={styles.title}>{title}</div>
											</Link>
										);
								  })}
						</div>
					)}
				</form>

				<div className={styles.account}>
					<Link className={styles.favorites} to={ROUTES.HOME}>
						<svg className={styles['icon-fav']}>
							<use xlinkHref={'sprite.svg#heart'} />
						</svg>
					</Link>

					<Link className={styles.cart} to={ROUTES.CART}>
						<svg className={styles['icon-cart']}>
							<use xlinkHref={'sprite.svg#bag'} />
						</svg>
						{/* Отображение количества товаров в корзине */}
						{!!cart.length && (
							<span className={styles.count}> {cart.length} </span>
						)}
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Header;
