import { useNavigate } from 'react-router';

import '../../index.scss';
import styles from './Addons.module.scss';
// import { useFormContext } from '../../contexts/FormContext';
import classNames from 'classnames';
import { CONFIG } from '../../config.mjs';
import PrevBtn from '../../components/PrevBtn';
import NextBtn from '../../components/NextBtn';

import { toggleAddon } from './AddonsSlice';
import { useDispatch, useSelector } from 'react-redux';
import PageNav from '../../components/PageNav.jsx';

export default function Addons() {
	const navigate = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();
		navigate('/summary');
	}

	return (
		<>
			<PageNav />
			<section className={styles.addons}>
				<form
					className={classNames('form-area', styles.addonsChecklist)}
					id="formAddonsSelect"
					// onSubmit={onSubmitCall}
				>
					<header>
						<h2>Pick add-ons</h2>
						<p className="plain-text">Add-ons help enhance your gaming experiance.</p>
					</header>

					<fieldset className={styles.fieldset}>
						{Object.entries(CONFIG.addons).map(([addonUrl, data]) => (
							<Addon addonUrl={addonUrl} addonData={data} key={addonUrl} />
						))}
					</fieldset>
				</form>

				<menu className="prev-next-buttons">
					<PrevBtn />
					<NextBtn bindForm="formAddonsSelect" handleClick={handleSubmit} />
				</menu>
			</section>
		</>
	);
}

// eslint-disable-next-line react/prop-types
function Addon({ addonUrl, addonData }) {
	const dispatch = useDispatch();
	const isMonthly = useSelector((store) => store.plan.isMonthly);
	const addonStates = useSelector((store) => store.addons.addonStates);

	// eslint-disable-next-line react/prop-types
	const { monthly, yearly, title, description } = addonData;

	function onAddonSelect(e) {
		// dispatch({ type: 'select addon', payload: e.target.value });
		dispatch(toggleAddon(e.target.value));
	}

	return (
		<label className={styles.label}>
			<input
				type="checkbox"
				value={addonUrl}
				checked={addonStates[addonUrl]}
				onChange={onAddonSelect}
			/>
			<div className={styles.text}>
				<span className={styles.addonTitle}>{title}</span>
				<span className={classNames('plain-text', styles.description)}>{description}</span>
			</div>
			<span className={styles.tariff}>{isMonthly ? `+${monthly}$/mo` : `+${yearly}$/yr`}</span>
		</label>
	);
}
