import { Link } from 'react-router-dom';

// типизация пропса ( ОПЦИОНАЛЬНО )
import PropTypes from 'prop-types';

import styles from './Products.module.css';

const Products = ({ title, style = {}, products = [], amount }) => {
	// фильтруем наш список продуктов чтобы не превышал amount(количество)
	const list = products.filter((_, i) => i < amount);


	// типизация пропса ( ОПЦИОНАЛЬНО )
	Products.propTypes = {
		title: PropTypes.string,
		style: PropTypes.object,
		products: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.number.isRequired,
				images: PropTypes.array,
				title: PropTypes.string.isRequired,
				category: PropTypes.shape({
					name: PropTypes.string.isRequired,
				}).isRequired,
				price: PropTypes.number.isRequired,
			})
		),
		amount: PropTypes.number.isRequired,
	};

	return (
		<section className={styles.products} style={style}>
			{title && <h2> {title} </h2>}

			<div className={styles.list}>
				{list.map(
					({ id, images = [], title, category: { name: cat }, price }) => (
						<Link className={styles.product} to={`/products/${id}`} key={id}>
							<div
								className={styles.image}
								style={{ backgroundImage: `url(${images[0]})` }}
							/>

							<div className={styles.wrapper}>
								<h3 className={styles.title}>{title}</h3>
								<div className={styles.cat}>{cat}</div>
								<div className={styles.info}>
									<div className={styles.prices}>
										<div className={styles.price}>{price} $ </div>
										<div className={styles.oldPrices}>
											{Math.floor(price * 0.8)} $
										</div>
									</div>

									<div className={styles.purchases}>
										{Math.floor(Math.random() * 20 + 1)} bought
									</div>
								</div>
							</div>
						</Link>
					)
				)}
			</div>
		</section>
	);
};

export default Products;
