// import React from 'react'

import { Link } from 'react-router-dom';

// Импорт маршруты
import { ROUTES } from '../../utils/routes';
// Импорт img
import LOGO from '../../assets/img/logo.svg';

import styles from './Footer.module.css';

const Footer = () => {
	return (
		<section className={styles.footer}>
			<div className={styles.logo}>
				<Link to={ROUTES.HOME}>
					<img src={LOGO} alt='logo' />
				</Link>
			</div>

			<div className={styles.rights}>
				development by {' '}
				<a href='#'>saturnz69</a>
			</div>

			<div className={styles.socials}>
				<a href='https://instagram.com'>
					<svg className='icon'>
						<use xlinkHref={'sprite.svg#instagram'} />
					</svg>
				</a>

				<a href='https://facebook.com'>
					<svg className='icon'>
						<use xlinkHref={'sprite.svg#facebook'} />
					</svg>
				</a>

				<a href='https://youtube.com'>
					<svg className='icon'>
						<use xlinkHref={'sprite.svg#youtube'} />
					</svg>
				</a>
			</div>
		</section>
	);
};

export default Footer;
