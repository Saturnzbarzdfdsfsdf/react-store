import React from 'react';

import { useDispatch } from 'react-redux';
import { createUser } from '../../redux/user/userSlice';


import styles from './User.module.css';

const UserSighupFrom = ({ toggleCurrentFormType, closeForm }) => {
	const dispatch = useDispatch();

	const [values, setValue] = React.useState({
		name: '',
		email: '',
		password: '',
		avatar:
			'https://images.panda.org/assets/images/pages/welcome/orangutan_1600x1000_279157.jpg',
	});
	
	// В логине более простая функция на 17 строчке
	const handleChange = ({ target: { value, name } }) => {
		setValue({ ...values, [name]: value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		// Проверка на заполненность полей
		const isNotEmpty = Object.values(values).every(val => val);
		// если поля не заполнены, то выйти из кода
		if (!isNotEmpty) return;

		// если заполнены, то отправляю в redux
		dispatch(createUser(values));
		closeForm();
	};

	return (
		<div className={styles.wrapper}>
			<div onClick={closeForm} className={styles.close}>
				<svg className='icon'>
					{/* <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} /> */}
					<use xlinkHref={`sprite.svg#close`} />
				</svg>
			</div>

			<div className={styles.title}>Sign UP</div>

			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.group}>
					<input
						onChange={handleChange}
						value={values.email}
						type='email'
						name='email'
						placeholder='Your email'
						autoComplete='off'
						required
					/>
				</div>

				<div className={styles.group}>
					<input
						onChange={handleChange}
						value={values.name}
						type='name'
						name='name'
						placeholder='Your name'
						autoComplete='off'
						required
					/>
				</div>

				<div className={styles.group}>
					<input
						onChange={handleChange}
						value={values.password}
						name='password'
						type='password'
						placeholder='Your password'
						autoComplete='off'
						required
					/>
				</div>

				<div className={styles.group}>
					<input
						onChange={handleChange}
						value={values.avatar}
						type='avatar'
						placeholder='Your avatar'
						autoComplete='off'
						required
					/>
				</div>

				<div className={styles.link} onClick={() => toggleCurrentFormType('login')}>
					{' '}
					I already have an account
				</div>
				<button type='submit' className={styles.submit}>
					Create an account
				</button>
			</form>
		</div>
	);
};

export default UserSighupFrom;
