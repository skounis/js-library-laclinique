import './css/App.css';

class Reference {
  /**
   * Taux d'inflation		2.00%	
   */
  inflationRate = 0.02;

  /**
   * Début Prestation RRQ	65 ans	1208.26	par mois
   */
  startBenefitAge = 65;
  startBenefitPerMonth = 1208.26;

  /**
   * Prestation SV	65 ans	635.26	par mois
   */
  benefitSVAge = 65;
  benefitSVPerMonth = 635.26;

  /**
   * Taux de rendement	
   *  Prudent   4.00%		
   *  Modéré		6.00%	
   *  Audacieux	8.00%	
   */
  returnRateSafe = 0.04;
  returnRateModerate = 0.06;
  returnRateBold = 0.08;

  /**
   * Durée de la rente 	à 	85	ans
   */
  durationAge = 85;
}

class Input {
  /**
   * Client
   */
  client = 'John Smith';

  /**
   * Combien avez-vous de côté
   */
  capital = 50000;

  /**
   * Quel âge avez-vous
   */
  age = 45;

  /**
   * Quel revenu annuel désirez-vous
   */
  annualIncome = 68000 * 0.7
}

class Inflation {

  constructor(reference, input) {
    this.reference = reference;
    this.input = input;
  }
  /**
   * Votre revenu ajusté à l'inflation
   */
  adjustedIncome = () => {
    // =E7*(1+'Informations de base'!C4)^(65-Calculs!E6)
    const value = this.input.annualIncome * Math.pow(1 + this.reference.inflationRate, 65 - this.input.age)
    return value
  }

  /**
   * Prestations des régimes d'états
   */
  stateBenefits = () => {
    // =('Informations de base'!C6+'Informations de base'!C7)*12*(1+'Informations de base'!C4)^(65-Calculs!E6)
    const value = (this.reference.startBenefitPerMonth + this.reference.benefitSVPerMonth) * 12 * Math.pow(1 + this.reference.inflationRate, 65 - this.input.age)
    return value
  }

  /**
   * Proportion à financer
   */
  finance = () => {
    return this.adjustedIncome() - this.stateBenefits();
  }
}

class Capital {

  constructor(reference, finance) {
    this.reference = reference;
    this.finance = finance;
  }

  /**
   * Capital à accumuler Prudent
   * @returns 
   */
  safe = () => {
    // =(E$14/'Informations de base'!C10)*(1-(1/(1+'Informations de base'!C10)^(100-65)))
    const finance = this.finance;
    const rate = this.reference.returnRateSafe;
    const value = (finance / rate) * (1 - (1 / Math.pow(1 + rate, 100 - 65)))
    return value
  }

  /**
   * Capital à accumuler Modéré
   * @returns 
   */
  moderate = () => {
    const finance = this.finance;
    const rate = this.reference.returnRateModerate;
    const value = (finance / rate) * (1 - (1 / Math.pow(1 + rate, 100 - 65)))
    return value
  }

  /**
   * Capital à accumuler Audacieu
   * @returns 
   */
  bold = () => {
    const finance = this.finance;
    const rate = this.reference.returnRateBold;
    const value = (finance / rate) * (1 - (1 / Math.pow(1 + rate, 100 - 65)))
    return value
  }

}

class Report {
  KEYS = {
    ANNUAL_INCOME: 'ANNUAL_INCOME',
    CURRENT_ASSET: 'CURRENT_ASSET',
    ASSET_AT_AGE: 'ASSET_AT_AGE',
    TARGET_CAPITAL: 'TARGET_CAPITAL',
    MONTHLY_INVESTMENT: 'MONTHLY_INVESTMENT'
  }
  constructor(reference, input, inflation, capital) {
    this.reference = reference;
    this.input = input;
    this.inflation = inflation;
    this.capital = capital;
  }

  /**
   * Versement annuel pour accumuler
   * Investisseur prudent
   * @returns 
   */
  safe = () => {
    const annualIncome = this.inflation.adjustedIncome();
    const currentAsset = this.input.capital;
    // =E29*(1+'Informations de base'!C10)^(65-Calculs!E6)
    const assetAtAge = currentAsset * Math.pow(1 + this.reference.returnRateSafe, 65 - this.input.age);
    const targetCapital = this.capital.safe();
    // =('Informations de base'!C10/12*(Calculs!E31-E30)) / ( 1-(1+'Informations de base'!C10/12)^( (65-E6)*12 ) )*-1
    const monthlyRate = this.reference.returnRateSafe / 12;
    const monthlyInvestment = (monthlyRate * (targetCapital - assetAtAge)) / (1 - Math.pow((1 + monthlyRate), (65 - this.input.age) * 12)) * -1
    return {
      ANNUAL_INCOME: annualIncome,
      CURRENT_ASSET: currentAsset,
      ASSET_AT_AGE: assetAtAge,
      TARGET_CAPITAL: targetCapital,
      MONTHLY_INVESTMENT: monthlyInvestment
    }
  }

  /**
   * Versement annuel pour accumuler
   * Investisseur modéré
   * @returns 
   */
  moderate = () => {
    const annualIncome = this.inflation.adjustedIncome();
    const currentAsset = this.input.capital;
    // =E29*(1+'Informations de base'!C10)^(65-Calculs!E6)
    const assetAtAge = currentAsset * Math.pow(1 + this.reference.returnRateModerate, 65 - this.input.age);
    const targetCapital = this.capital.moderate();
    // =('Informations de base'!C10/12*(Calculs!E31-E30)) / ( 1-(1+'Informations de base'!C10/12)^( (65-E6)*12 ) )*-1
    const monthlyRate = this.reference.returnRateModerate / 12;
    const monthlyInvestment = (monthlyRate * (targetCapital - assetAtAge)) / (1 - Math.pow((1 + monthlyRate), (65 - this.input.age) * 12)) * -1
    return {
      ANNUAL_INCOME: annualIncome,
      CURRENT_ASSET: currentAsset,
      ASSET_AT_AGE: assetAtAge,
      TARGET_CAPITAL: targetCapital,
      MONTHLY_INVESTMENT: monthlyInvestment
    }
  }

  /**
   * Versement annuel pour accumuler
   * Investisseur Audacieu
   * @returns 
   */
  bold = () => {
    const annualIncome = this.inflation.adjustedIncome();
    const currentAsset = this.input.capital;
    // =E29*(1+'Informations de base'!C10)^(65-Calculs!E6)
    const assetAtAge = currentAsset * Math.pow(1 + this.reference.returnRateBold, 65 - this.input.age);
    const targetCapital = this.capital.bold();
    // =('Informations de base'!C10/12*(Calculs!E31-E30)) / ( 1-(1+'Informations de base'!C10/12)^( (65-E6)*12 ) )*-1
    const monthlyRate = this.reference.returnRateBold / 12;
    const monthlyInvestment = (monthlyRate * (targetCapital - assetAtAge)) / (1 - Math.pow((1 + monthlyRate), (65 - this.input.age) * 12)) * -1
    return {
      ANNUAL_INCOME: annualIncome,
      CURRENT_ASSET: currentAsset,
      ASSET_AT_AGE: assetAtAge,
      TARGET_CAPITAL: targetCapital,
      MONTHLY_INVESTMENT: monthlyInvestment
    }
  }
}
class App {
  myVar = true;

  constructor() {
    const { myArrowMethod, myVar } = this;
    // console.log("Lib constructor called", myVar);
    myArrowMethod();
    this.inflation = new Inflation(this.getReference(), this.getInput());
    this.capital = new Capital(this.getReference(), this.inflation.finance());
    this.report = new Report(this.getReference(), this.getInput(), this.inflation, this.capital)
  }

  myArrowMethod = () => {
    // console.log("Arrow method fired");
  }

  getReference = () => {
    return new Reference();
  }

  getInput = () => {
    return new Input();
  }
}

export default App;
