import classNames from 'classnames';

import PageNav from '../../components/PageNav.jsx';

import '../../index.scss';
import styles from './Success.module.scss';

export default function Success() {
	return (
		<>
			<PageNav />
			<section className={styles.success}>
				<div className={classNames('form-area', styles.thanxMessage)}>
					<img src="./assets/images/icon-thank-you.svg" alt="" className={styles.icon} />
					<h2>Thank you!</h2>
					<p className="plain-text">
						Thanks for confirming your subscription! We hope you have fun using our platform. If you
						ever need support, please feel free to email us at support@loremgaming.com
					</p>
				</div>
			</section>
		</>
	);
}
