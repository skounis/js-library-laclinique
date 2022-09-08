import App from './../App';

it('renders without crashing', () => {
  new App();
});

it('confirms the default reference values', () => {
  const v = App.GetReference();
  expect(v.inflationRate).toBe(0.02);
  expect(v.startBenefitAge).toBe(65);
  expect(v.startBenefitPerMonth).toBe(1208.26);
  expect(v.benefitSVAge).toBe(65);
  expect(v.benefitSVPerMonth).toBe(635.26);
  expect(v.returnRateSafe).toBe(0.04);
  expect(v.returnRateModerate).toBe(0.06);
  expect(v.durationAge).toBe(85);
})

it('confirms the default input values', () => {
  const v = App.GetInput();
  expect(v.client).toBe('John Smith');
  expect(v.capital).toBe(50000);
  expect(v.age).toBe(45);
  expect(v.annualIncome).toBe(68000 * 0.7);
})


it('calulates the adjustedIncome', () => {
  const v = new App().inflation.adjustedIncome()
  expect(Math.round(v)).toBe(70731);
})

it('calulates the stateBenefits', () => {
  const v = new App().inflation.stateBenefits()
  expect(Math.round(v)).toBe(32872);
})


it('calulates the finance', () => {
  const v = new App().inflation.finance()
  expect(Math.round(v)).toBe(37859);
})


it('calulates the capital', () => {
  const s = new App().capital.safe()
  const m = new App().capital.moderate()
  const b = new App().capital.bold()
  expect(Math.round(s)).toBe(706616);
  expect(Math.round(m)).toBe(548883);
  expect(Math.round(b)).toBe(441226);
})

it('collects the report with default values', () => {
  const a = new App();
  const s = a.report.safe()
  expect(Math.round(s[a.report.KEYS.ANNUAL_INCOME])).toBe(70731);
  expect(Math.round(s[a.report.KEYS.CURRENT_ASSET])).toBe(50000);
  expect(Math.round(s[a.report.KEYS.ASSET_AT_AGE])).toBe(109556);
  expect(Math.round(s[a.report.KEYS.TARGET_CAPITAL])).toBe(706616);
  expect(Math.round(s[a.report.KEYS.MONTHLY_INVESTMENT])).toBe(1628);

  const m = a.report.moderate()
  expect(Math.round(m[a.report.KEYS.ANNUAL_INCOME])).toBe(70731);
  expect(Math.round(m[a.report.KEYS.CURRENT_ASSET])).toBe(50000);
  expect(Math.round(m[a.report.KEYS.ASSET_AT_AGE])).toBe(160357);
  expect(Math.round(m[a.report.KEYS.TARGET_CAPITAL])).toBe(548883);
  expect(Math.round(m[a.report.KEYS.MONTHLY_INVESTMENT])).toBe(841);

  const b = a.report.bold()
  expect(Math.round(b[a.report.KEYS.ANNUAL_INCOME])).toBe(70731);
  expect(Math.round(b[a.report.KEYS.CURRENT_ASSET])).toBe(50000);
  expect(Math.round(b[a.report.KEYS.ASSET_AT_AGE])).toBe(233048);
  expect(Math.round(b[a.report.KEYS.TARGET_CAPITAL])).toBe(441226);
  expect(Math.round(b[a.report.KEYS.MONTHLY_INVESTMENT])).toBe(353);


  console.log('Reports\n==========\n\nSafe:\n', s, 
  '\n\nModerate:\n', m,
  '\n\nBold:\n', b
  )
})

it('collects the report with input values', () => {
  const reference = App.GetReference();
  const input = App.GetInput()
  const a = new App(reference, input);
  const s = a.report.safe()
  expect(Math.round(s[a.report.KEYS.ANNUAL_INCOME])).toBe(70731);
  expect(Math.round(s[a.report.KEYS.CURRENT_ASSET])).toBe(50000);
  expect(Math.round(s[a.report.KEYS.ASSET_AT_AGE])).toBe(109556);
  expect(Math.round(s[a.report.KEYS.TARGET_CAPITAL])).toBe(706616);
  expect(Math.round(s[a.report.KEYS.MONTHLY_INVESTMENT])).toBe(1628);

  const m = a.report.moderate()
  expect(Math.round(m[a.report.KEYS.ANNUAL_INCOME])).toBe(70731);
  expect(Math.round(m[a.report.KEYS.CURRENT_ASSET])).toBe(50000);
  expect(Math.round(m[a.report.KEYS.ASSET_AT_AGE])).toBe(160357);
  expect(Math.round(m[a.report.KEYS.TARGET_CAPITAL])).toBe(548883);
  expect(Math.round(m[a.report.KEYS.MONTHLY_INVESTMENT])).toBe(841);

  const b = a.report.bold()
  expect(Math.round(b[a.report.KEYS.ANNUAL_INCOME])).toBe(70731);
  expect(Math.round(b[a.report.KEYS.CURRENT_ASSET])).toBe(50000);
  expect(Math.round(b[a.report.KEYS.ASSET_AT_AGE])).toBe(233048);
  expect(Math.round(b[a.report.KEYS.TARGET_CAPITAL])).toBe(441226);
  expect(Math.round(b[a.report.KEYS.MONTHLY_INVESTMENT])).toBe(353);


  console.log('Reports\n==========\n\nSafe:\n', s, 
  '\n\nModerate:\n', m,
  '\n\nBold:\n', b
  )
})