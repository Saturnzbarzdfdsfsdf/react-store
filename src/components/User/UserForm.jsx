import { useSelector, useDispatch } from 'react-redux';
import { toggleForm, toggleFormType } from '../../redux/user/userSlice';

import UserSighupFrom from './UserSighupFrom';
import UserLoginForm from './UserLoginForm ';

import styles from './User.module.css';

const UserForm = () => {
	const dispatch = useDispatch();

	const { showForm, formType } = useSelector(({ user }) => user);

	const closeForm = () => dispatch(toggleForm(false));
	const toggleCurrentFormType = type => dispatch(toggleFormType(type));

	return showForm ? (
		<>
			<div className={styles.overlay} onClick={closeForm}></div>

			{formType === 'signup' ? (
				<UserSighupFrom
					toggleCurrentFormType={toggleCurrentFormType}
					closeForm={closeForm}
				/>
			) : (
				<UserLoginForm
					toggleCurrentFormType={toggleCurrentFormType}
					closeForm={closeForm}
				/>
			)}
		</>
	) : (
		<></>
	);
};

export default UserForm;
