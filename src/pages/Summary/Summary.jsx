// import { useFormContext } from '../../contexts/FormContext';
import classNames from 'classnames';
// import '../index.scss';
import '../../index.scss';
import styles from './Summary.module.scss';
import { CONFIG } from '../../config.mjs';

// import Success from './Success';
import Success from '../Success/Success';
import { useNavigate } from 'react-router';
import PrevBtn from '../../components/PrevBtn';
import NextBtn from '../../components/NextBtn';

import { useDispatch, useSelector } from 'react-redux';
import { togglePeriod } from '../SelectPlan/SelectPlanSlice';
import { markSuccessful } from './SummarySlice';

export default function Summary() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// const person = useSelector((store) => store.personInfo.person);
	const personFormErrors = useSelector((store) => store.personInfo.personFormErrors);
	const isMonthly = useSelector((store) => store.plan.isMonthly);
	const plan = useSelector((store) => store.plan.selectedPlan);
	const addonStates = useSelector((store) => store.addons.addonStates);
	const isSuccessful = useSelector((store) => store.summary.isSuccessful);

	// const { isSuccessful, person, personFormErrors, isMonthly, plan, addonStates, dispatch } =
	// 	useFormContext();

	if (isSuccessful) return <Success />;

	function handleSubmit(e) {
		e.preventDefault();
		if (Object.values(personFormErrors).length === 0) dispatch(markSuccessful());
		else navigate('/personal-info');
	}

	function onPeriodChange() {
		// dispatch({ type: 'switch period' });
		dispatch(togglePeriod());
	}
	const selectedAddons = Object.entries(CONFIG.addons).filter(
		([addon, data]) => addonStates[addon]
	);

	const addonsMonthlyCost = selectedAddons.reduce((acc, [addon, data]) => acc + data.monthly, 0);
	const addonsYearlyCost = selectedAddons.reduce((acc, [addon, data]) => acc + data.yearly, 0);

	const selectedPlan = CONFIG.plans[plan];
	const totalMonthlyCost = selectedPlan.monthly + addonsMonthlyCost;
	const totalYearlyCost = selectedPlan.yearly + addonsYearlyCost;

	// console.log(selectedPlan);

	return (
		<section className={styles.summary}>
			<table className={classNames('form-area', styles.summaryTable)}>
				<caption className={styles.tableCaption}>
					<h2>Finishing up</h2>
					<p className="plain-text">Double-check everything looks OK before confirming.</p>
				</caption>

				<tbody className={styles.tableBody}>
					<tr className={styles.tableRow}>
						<th className={styles.tableRHplan} scope="row">
							{selectedPlan.title} ({isMonthly ? 'Monthly' : 'Yearly'})
							<label className={classNames(styles.label, 'plain-text')}>
								{/* <label className={styles.label}> */}
								Change
								<input
									className={styles.input}
									type="checkbox"
									checked={isMonthly}
									onChange={onPeriodChange}
								/>
							</label>
						</th>
						<td>{isMonthly ? `$${selectedPlan.monthly}/mo` : `$${selectedPlan.yearly}/yr`}</td>
					</tr>

					{selectedAddons.map(([addonUrl, addonData]) => (
						<TableRowAddon addonData={addonData} key={addonUrl} />
					))}
				</tbody>

				<tfoot className={styles.tableFooter}>
					<tr className={styles.tableRow}>
						<th className="plain-text">Total (per {isMonthly ? 'month' : 'year'})</th>
						<td>{isMonthly ? `+${totalMonthlyCost}$/mo` : `+${totalYearlyCost}$/yr`}</td>
					</tr>
				</tfoot>
			</table>
			<menu className="prev-next-buttons">
				<PrevBtn />
				<NextBtn handleClick={handleSubmit} />
			</menu>
		</section>
	);
}

// eslint-disable-next-line react/prop-types
function TableRowAddon({ addonData }) {
	// const { isMonthly } = useFormContext();
	const isMonthly = useSelector((store) => store.plan.isMonthly);
	// eslint-disable-next-line react/prop-types
	const { monthly, yearly, title } = addonData;
	return (
		<tr className={styles.tableRow}>
			<th scope="row" className="plain-text">
				{title}
			</th>
			<td>{isMonthly ? `+${monthly}$/mo` : `+${yearly}$/yr`}</td>
		</tr>
	);
}
