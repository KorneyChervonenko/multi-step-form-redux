import { useNavigate } from 'react-router';
import '../../index.scss';
import styles from './SelectPlan.module.scss';
// import { useFormContext } from '../../contexts/FormContext';
import classNames from 'classnames';
import { CONFIG } from '../../config.mjs';
import PrevBtn from '../../components/PrevBtn';
import NextBtn from '../../components/NextBtn';
import { useDispatch, useSelector } from 'react-redux';

import { selectPlan, togglePeriod } from './SelectPlanSlice';

export default function SelectPlan() {
	// const { isMonthly, dispatch } = useFormContext();
	const dispatch = useDispatch();
	const isMonthly = useSelector((store) => store.plan.isMonthly);
	const navigate = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();
		navigate('/add-ons');
	}

	function onPeriodChange() {
		// dispatch({ type: 'switch period' });
		dispatch(togglePeriod());
	}

	return (
		<section className={styles.selectPlan}>
			<form
				className={classNames('form-area', styles.formSelectPlan)}
				id="formPlanSelect"
				// onSubmit={handleSubmit}
			>
				<header>
					<h2>Select your plan</h2>
					<p className="plain-text">You have the option of monthly or yearly billing.</p>
				</header>

				<fieldset className={styles.fieldset}>
					{Object.entries(CONFIG.plans).map(([planUrl, data]) => (
						<Plan planUrl={planUrl} planData={data} key={planUrl} />
					))}
				</fieldset>

				<div className={styles.periodSwitch}>
					{/* <span>Monthly</span> */}
					<span className={isMonthly ? styles.selected : styles.deselected}>Monthly</span>
					<label className={styles.switchLabel}>
						<input
							type="checkbox"
							className={styles.periodSwitchInput}
							checked={isMonthly}
							onChange={onPeriodChange}
						/>
						<span className={styles.toggleLever}></span>
					</label>
					{/* <span>Yearly</span> */}
					<span className={isMonthly ? styles.deselected : styles.selected}>Yearly</span>
				</div>
			</form>

			<menu className="prev-next-buttons">
				<PrevBtn />
				<NextBtn bindForm="formPlanSelect" handleClick={handleSubmit} />
			</menu>
		</section>
	);
}

// eslint-disable-next-line react/prop-types
function Plan({ planUrl, planData }) {
	// eslint-disable-next-line react/prop-types
	const { monthly, yearly, title } = planData;
	// const { isMonthly, plan, dispatch } = useFormContext();
	const isMonthly = useSelector((store) => store.plan.isMonthly);
	const plan = useSelector((store) => store.plan.selectedPlan);
	const dispatch = useDispatch();

	function onPlanSelect(e) {
		// dispatch({ type: 'set plan', payload: e.target.value });
		dispatch(selectPlan(e.target.value));
	}
	return (
		<label className={styles.label}>
			<input
				type="radio"
				name="plan"
				value={planUrl}
				checked={plan === planUrl}
				onChange={onPlanSelect}
				className={styles.radioBtn}
			/>
			<img src={`./assets/images/icon-${planUrl}.svg`} alt="" className={styles.icon} />
			<div className={styles.text}>
				<span className={styles.planTitle}>{title}</span>
				<span className={styles.tariff}>{isMonthly ? `+${monthly}$/mo` : `+${yearly}$/yr`}</span>
				{!isMonthly && <span className={styles.promoMsg}>2 months free</span>}
			</div>
		</label>
	);
}
