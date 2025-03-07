import { NavLink } from 'react-router';
import { useSelector } from 'react-redux';

// import { useFormContext } from '../contexts/FormContext';
import styles from './PageNav.module.scss';

export default function PageNav() {
	const items = [
		{ title: 'YOUR INFO', path: '/personal-info' },
		{ title: 'SELECT PLAN', path: '/select-plan' },
		{ title: 'ADD-ONS', path: '/add-ons' },
		{ title: 'SUMMARY', path: '/summary' },
	];

	const isSuccessful = useSelector((store) => store.summary.isSuccessful);

	return (
		<menu className={styles.pageMenu} role="menu">
			{items.map((item, index) => (
				<li className={styles.item} key={item.title} role="none">
					{/* <NavLink to={item.path} className={styles.pageLink} role="menuitem"> */}
					<NavLink to={isSuccessful ? '' : item.path} className={styles.pageLink} role="menuitem">
						<div className={styles.itemMarker}>{index + 1}</div>
						<div className={styles.itemLabel} aria-label={`step ${index + 1}: ${item.title}`}>
							<span>STEP {index + 1}</span>
							<span>{item.title}</span>
						</div>
					</NavLink>
				</li>
			))}
		</menu>
	);
}
