import { Link } from 'react-router-dom';

// типизация пропса ( ОПЦИОНАЛЬНО )
// import PropTypes from 'prop-types';

import styles from './Categories.module.css';

const Categories = ({ title, products = [], amount }) => {
	// фильтруем наш список продуктов чтобы не превышал amount(количество)
	const list = products.filter((_, i) => i < amount);

	// типизация пропса ( ОПЦИОНАЛЬНО )
	// Categories.propTypes = {
	// 	title: PropTypes.string,
	// 	style: PropTypes.object,
	// 	products: PropTypes.arrayOf(
	// 		PropTypes.shape({
	// 			id: PropTypes.number.isRequired,
	// 			images: PropTypes.array,
	// 			title: PropTypes.string.isRequired,
	// 			category: PropTypes.shape({
	// 				name: PropTypes.string.isRequired,
	// 			}).isRequired,
	// 			price: PropTypes.number.isRequired,
	// 		})
	// 	),
	// 	amount: PropTypes.number.isRequired,
	// };

	return (
		<section className={styles.section}>
			<h2> {title} </h2>

			<div className={styles.list}>
				{list.map(({ id, name, image }) => (
          <Link to={`/categories/${id}`} key={id} className={styles.item}>
						<div
							className={styles.image}
							style={{ backgroundImage: `url(${image})` }}
						/>
						<h3 className={styles.title}>{name}</h3>
					</Link>
				))}
			</div>
		</section>
	);
};

export default Categories;
