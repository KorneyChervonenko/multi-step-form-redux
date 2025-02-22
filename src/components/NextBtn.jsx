import { useLocation } from 'react-router';
// import classNames from 'classnames';
import styles from './NextBtn.module.scss';
// import '../index.scss';

// eslint-disable-next-line react/prop-types
export default function NextBtn({ bindForm, handleClick }) {
	const location = useLocation();
	const isLastPage = location.pathname === '/summary';

	return (
		<button
			type="submit"
			// className="next-btn"
			// className={classNames('next-btn', styles.nextButton  )}
			className={`next-btn ${isLastPage ? styles.confirmButton : styles.nextButton}`}
			form={bindForm}
			onClick={handleClick}
		>
			{isLastPage ? 'Confirm' : 'Next Step'}
		</button>
	);
}
