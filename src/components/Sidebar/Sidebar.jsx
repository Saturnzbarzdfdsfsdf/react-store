// import React from 'react'

// Расширенная версия Link (можем добавить стили)
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './Sidebar.module.css';

const Sidebar = () => {
	const { list } = useSelector(({ categories }) => categories);

	return (
		<section className={styles.sidebar}>
			<div className={styles.title}>CATEGORIES</div>
			<nav>
				<ul className={styles.menu}>
					{/* мапим наш список категорий */}
					{list.map(({ id, name }) => (
						<li key={id}>
							{/* у NavLink есть isActive если true то вешаем стили */}
							<NavLink
								className={({ isActive }) =>
									`${styles.link} ${isActive ? styles.active : ''}`
								}
								to={`/categories${id}`}
							>
								{name}
							</NavLink>
						</li>
					))}
				</ul>
			</nav>

			<div className={styles.footer}>
				<a className={styles.link} href='#'>
					Help
				</a>
				<a
					className={styles.link}
					href='#'
					style={{ textDecoration: 'underline' }}
				>
					Terms & Conditions{' '}
				</a>
			</div>
		</section>
	);
};

export default Sidebar;
