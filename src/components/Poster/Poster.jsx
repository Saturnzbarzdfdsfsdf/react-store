import styles from './Poster.module.css';

import BG from '../../assets/img/comp.png';

const Poster = () => {
	return (
		<section className={styles.home}>
			<div className={styles.title}>BIG DIG 20%</div>
			<div className={styles.product}>
				<div className={styles.text}>
					<div className={styles.subtitle}>the bestseller of 20k24</div>
					<h1 className={styles.head}>LEGION r666 width NVIDIA 4090 ti</h1>
					<button className={styles.button}>Show now</button>
				</div>
				<div className={styles.image}>
					<img src={BG} alt='computer' />
				</div>
			</div>
		</section>
	);
};

export default Poster;
