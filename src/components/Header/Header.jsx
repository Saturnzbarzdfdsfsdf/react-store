// import React from 'react'

import { Link } from 'react-router-dom';

// Импорт маршруты
import { ROUTES } from '../../utils/routes';

// Импорт img
import LOGO from '../../assets/img/logo.svg';
import AVATAR from '../../assets/img/avatar.jpg';

import styles from './Header.module.css';

const Header = () => {
  return (
		<div className={styles.header}>
			<div className={styles.logo}>
				<Link to={ROUTES.HOME}>
					<img src={LOGO} alt='logo' />
				</Link>
			</div>

			<div className={styles.info}>
				<div className={styles.user}>
					<div
						className={styles.avatar}
						style={{ backgroundImage: `url(${AVATAR})` }}
					/>
					<div className={styles.username}>Guest</div>
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
							value=''
							onChange={() => {}}
						/>
					</div>

					{/* {false && <div className={styles.box}></div>} */}

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
						<span className={styles.count}>64</span>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Header