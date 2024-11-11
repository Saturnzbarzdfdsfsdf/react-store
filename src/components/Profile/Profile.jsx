import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/user/userSlice';

import styles from './Profile.module.css';

const Profile = () => {
	const dispatch = useDispatch();

	const { currentUser } = useSelector(({ user }) => user);

	const [values, setValue] = useState({
		name: '',
		email: '',
		password: '',
		avatar:
			'https://images.panda.org/assets/images/pages/welcome/orangutan_1600x1000_279157.jpg',
	});

	useEffect(() => {
		if (!currentUser) return;

		setValue(currentUser);
	}, [currentUser]);

	const handleChange = ({ target: { value, name } }) => {
		setValue({ ...values, [name]: value });
	};

	const handleSubmit = e => {
		e.preventDefault();

		const isNotEmpty = Object.values(values).every(val => val);

		if (!isNotEmpty) return;

		dispatch(updateUser(values));
	};

	return (
		<section className={styles.profile}>
			{!currentUser ? (
				<span>You need to login</span>
			) : (
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
					<button type='submit' className={styles.submit}>
						update profile
					</button>
				</form>
			)}
		</section>
	);
};

export default Profile;
