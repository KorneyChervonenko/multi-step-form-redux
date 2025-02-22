import { useLocation, useNavigate } from 'react-router';
import classNames from 'classnames';
import styles from './PrevBtn.module.scss';

export default function PrevBtn() {
	const navigate = useNavigate();
	const location = useLocation();
	const isStartPage = location.pathname === '/personal-info';

	return (
		<>
			{!isStartPage && (
				<button
					type="button"
					// className="prev-btn"
					className={classNames('prev-btn', styles.prevButton)}
					onClick={() => navigate(-1)}
				>
					Go Back
				</button>
			)}
		</>
	);
}
