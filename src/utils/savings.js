/**
 * The savings calculation. Pure — no React, no DOM, no side effects.
 *
 * Kept out of the component so the maths can be read, reviewed and (later)
 * unit-tested on its own. A visitor is being shown a rupee figure they may make
 * a financial decision on; the arithmetic behind it should not be tangled up in
 * slider state.
 *
 * EVERY input comes from `home.savings.assumptions` in siteContent.js. There
 * are no numbers in this file — that is the point. Changing an assumption is a
 * content edit, and the client can see every figure that feeds the result.
 *
 * On fairness of the comparison: a Battwheelz subscription includes the vehicle, so
 * the petrol side must include the cost of acquiring one (EMI) and insuring it.
 * Comparing a subscription against a bike someone has already paid off would produce a
 * flattering number that would not survive a rider actually checking it.
 */

/**
 * @param {number} dailyKm  Distance ridden on a working day.
 * @param {object} a        The `assumptions` object from content.
 * @returns {{
 *   monthlyKm: number,
 *   petrol: { fuel: number, maintenance: number, emi: number, insurance: number, total: number },
 *   battwheelz: { subscription: number, charging: number, total: number },
 *   savings: number,
 *   savesMoney: boolean,
 * }}
 */
export function calculateSavings(dailyKm, a) {
  const monthlyKm = dailyKm * a.workingDaysPerMonth;

  // Petrol side: fuel burned, plus the fixed costs of owning the machine.
  const fuel = (monthlyKm / a.petrolBikeKmPerLitre) * a.petrolPricePerLitre;
  const petrol = {
    fuel,
    maintenance: a.petrolMaintenancePerMonth,
    emi: a.petrolBikeEmiPerMonth,
    insurance: a.petrolInsurancePerMonth,
    total: fuel + a.petrolMaintenancePerMonth + a.petrolBikeEmiPerMonth + a.petrolInsurancePerMonth,
  };

  // Battwheelz side: the subscription rate, plus electricity. Servicing, insurance and
  // recovery are inside the subscription, which is why they have no line here.
  const subscription = a.battwheelzDailyRate * a.workingDaysPerMonth;
  const charging = monthlyKm * a.evChargingCostPerKm;
  const battwheelz = { subscription, charging, total: subscription + charging };

  const savings = petrol.total - battwheelz.total;

  return {
    monthlyKm,
    petrol,
    battwheelz,
    savings,
    // A subscription can genuinely cost more for a very low-mileage rider. The UI says
    // so rather than clamping to zero and implying it is always cheaper.
    savesMoney: savings > 0,
  };
}

export default calculateSavings;
