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
  returnReteBold = 0.08;

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

class inflation {

  constructor(reference, input){
    this.reference = reference;
    this.input = input;
  }
  /**
   * Votre revenu ajusté à l'inflation
   */
  adjustedIncome = () => {
    // =E7*(1+'Informations de base'!C4)^(65-Calculs!E6)
    const value = this.input.annualIncome * Math.pow(1 + this.reference.inflationRate, 65 - this.input.age)
    return Math.round(value)
  }

  /**
   * Prestations des régimes d'états
   */
  stateBenefits = () => {
    // =('Informations de base'!C6+'Informations de base'!C7)*12*(1+'Informations de base'!C4)^(65-Calculs!E6)
    const value = (this.reference.startBenefitPerMonth + this.reference.benefitSVPerMonth) * 12 * Math.pow(1 + this.reference.inflationRate, 65 - this.input.age) 
    return Math.round(value)
  }

  /**
   * Proportion à financer
   */
  finance = () => {
    return this.adjustedIncome() - this.stateBenefits();
  }
}
class App {
  myVar = true;

  constructor(){
    const { myArrowMethod, myVar } = this;
    console.log("Lib constructor called", myVar);
    myArrowMethod();
    this.inflation = new inflation(this.getReference(), this.getInput());
  }

  myArrowMethod = () => {
    console.log("Arrow method fired");
  }

  getReference = () => {
    return new Reference();
  }

  getInput = () => {
    return new Input();
  }
}

export default App;
