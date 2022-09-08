import './css/App.css';
import Lib from './../lib';

class App {
  inputs = [];
  constructor() {
    document.getElementById("calculate").addEventListener("click", this.calculate);
    this.calculate();
    this.demoArrowMethod();
  }

  calculate = () => {
    console.log("Calculating...");
    const keys = {
      reference: [
        'inflationRate',
        'startBenefitAge',
        'startBenefitPerMonth',
        'benefitSVAge',
        'benefitSVPerMonth',
        'returnRateSafe',
        'returnRateModerate',
        'returnRateBold',
        'durationAge',
      ],
      input: [
        'client',
        'capital',
        'age',
        'annualIncome']
    }

    const reference = Lib.GetReference();
    const input = Lib.GetInput();

    keys.reference.forEach(key => {
      this.inputs[key] = document.querySelector(`#${key}`).valueAsNumber;
      reference[key] = this.inputs[key]
    });

    keys.input.forEach(key => {
      this.inputs[key] = document.querySelector(`#${key}`).valueAsNumber;
      input[key] = this.inputs[key]
    });

    const libInstance = new Lib(reference, input);
    const report = libInstance.report;
    console.log(report)
    const b = report.bold()
    Object.keys(report.KEYS).forEach((key) => {
      document.getElementById(`${key}[safe]`).value = report.safe()[key];
      document.getElementById(`${key}[moderate]`).value = report.moderate()[key];
      document.getElementById(`${key}[bold]`).value = report.bold()[key];
    });
  }
  
  demoArrowMethod = () => {
    // console.log("Arrow methods will work");
  }
}

export default App;
