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

	const handleChange = ({ target: { value, name } }) => {
		setValue({ ...values, [name]: value });
	};

	const handleSubmit = e => {
		e.preventDefault();

		const isNotEmpty = Object.values(values).every(val => val);

		if (!isNotEmpty) return;

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
