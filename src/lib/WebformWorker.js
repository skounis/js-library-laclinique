import WebformLogic from './WebformLogic';

class WebformWorker {
  keys = {
    input: [
      ['capital', 'civicrm_1_contact_1_cg56_custom_314'],
      ['capital', 'civicrm_1_contact_1_cg56_custom_505'],
      ['age', 'civicrm_1_contact_1_cg117_custom_762'],
      ['annualIncome', 'civicrm_1_contact_1_cg117_custom_776'],
      ['number_of_dec', 'number_of_dec']
    ],
    output: [
      ['TARGET_CAPITAL__SAFE', 'civicrm_1_contact_1_cg117_custom_770'],
      ['TARGET_CAPITAL__MODERATE', 'civicrm_1_contact_1_cg117_custom_771'],
      ['TARGET_CAPITAL__BOLD', 'civicrm_1_contact_1_cg117_custom_772'],
      ['MONTHLY_INVESTMENT__SAFE', 'civicrm_1_contact_1_cg117_custom_773'],
      ['MONTHLY_INVESTMENT__MODERATE', 'civicrm_1_contact_1_cg117_custom_774'],
      ['MONTHLY_INVESTMENT__BOLD', 'civicrm_1_contact_1_cg117_custom_775']
    ]
  }

  inputs = [];
  decimals = 0;

  constructor() {
    this.startListening();
    this.calculate();
  }

  startListening = () => {
    this.keys.input.forEach(element => {
      const name = element[1];
      document.querySelector(`[name="${name}"]`).addEventListener('change', this.calculate);
    });

  }

  calculate = () => {
    this.inputs = [];
    this.decimals = document.querySelector(`[name="number_of_dec"]`).valueAsNumber || 0;
    const reference = WebformLogic.GetReference();
    const input = WebformLogic.GetInput();


    console.log("Calculating....");

    const keys = this.keys;
    console.log(keys)

    keys.input.forEach(key => {
      this.inputs[key[0]] = (isNaN(this.inputs[key[0]]) ? 0 : this.inputs[key[0]]) + document.querySelector(`[name="${key[1]}"]`).valueAsNumber;
      input[key[0]] = this.inputs[key[0]]
    });

    console.log(input);
    console.log(this.inputs);

    const instance = new WebformLogic(reference, input);
    const report = instance.report;
    console.log(report)

    keys.output.forEach(slot => {
      const slots = slot[0].split('__');
      const name = slot[1];
      const key = slots[0];
      const target = slots[1];
      const value = report.value(key, target);
      document.querySelector(`[name="${name}"]`).value = value.toFixed(this.decimals);
    });
  }
}

export default WebformWorker