import React from 'react';

import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/user/userSlice';

import styles from './User.module.css';

const UserLoginForm = ({ toggleCurrentFormType, closeForm }) => {
	const dispatch = useDispatch();

	const [values, setValue] = React.useState({
		email: '',
		password: '',
	});

	// Обработка изменений полей ввода
	const handleChange = event => {
		// Извлекаем значение и имя поля из события
		const { value, name } = event.target;
		// Обновляем состояние, создавая новый объект values
		setValue(prevValues => ({
			...prevValues, // Сохраняем предыдущие значения
			[name]: value, // Обновляем только измененное поле
		}));
	};

	const handleSubmit = e => {
		e.preventDefault();
		// Проверка на заполненность полей
		const isNotEmpty = Object.values(values).every(val => val);
		// если поля не заполнены, то выйти из кода
		if (!isNotEmpty) return;
		
		// если заполнены, то отправляю в redux
		dispatch(loginUser(values));
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
						value={values.password}
						name='password'
						type='password'
						placeholder='Your password'
						autoComplete='off'
						required
					/>
				</div>
				<div
					className={styles.link}
					onClick={() => toggleCurrentFormType('signup')}
				>
					Create an account
				</div>
				<button type='submit' className={styles.submit}>
					Login
				</button>
			</form>
		</div>
	);
};

export default UserLoginForm;
