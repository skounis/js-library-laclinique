import WebformLogic from './WebformLogic';

class WebformWorker {
  static DEFAULT_KEYS = {
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
  };

  keys = { }

  inputs = [];
  decimals = 0;

  constructor(keys = null) {
    this.keys = keys || WebformWorker.DEFAULT_KEYS;
    this.startListening();
    this.calculate();
  }

  startListening = () => {
    this.keys.input.forEach(element => {
      const name = element[1];
      const e = document.querySelector(`[name="${name}"]`);
      if (!!e) {
        e.addEventListener('change', this.calculate);
      }
    });

  }

  parseValue(element) {
    if (!element) { return 0 }
    switch (element.type) {
      case 'number':
        return element.valueAsNumber || 0;
      case 'text':
        return parseFloat(element.value) || 0
      default:
        return 0;
    }
  }

  format(value, decimals) {
    value = value.toFixed(decimals);
    return value < 0 ? 0 : value;
  } 

  calculate = () => {
    this.inputs = [];
    this.decimals = this.parseValue(document.querySelector(`[name="number_of_dec"]`));
    const reference = WebformLogic.GetReference();
    const input = WebformLogic.GetInput();


    console.log("Calculating....");

    const keys = this.keys;
    console.log(keys)

    keys.input.forEach(key => {
      this.inputs[key[0]] = (isNaN(this.inputs[key[0]]) ? 0 : this.inputs[key[0]]) + this.parseValue(document.querySelector(`[name="${key[1]}"]`));
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
      document.querySelector(`[name="${name}"]`).value = this.format(value, this.decimals)
    });
  }
}

export default WebformWorker