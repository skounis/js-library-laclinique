/*!
 * 
 *   @skounis/js-library-laclinique v0.0.4
 *   https://github.com/morethanthemes/mtp-lacliniquefinanciere-webform-calculations-w36873345
 *
 *   Copyright (c) Stavros Kounis (https://github.com/skounis)
 *
 *   This source code is licensed under the MIT license found in the
 *   LICENSE file in the root directory of this source tree.
 *
 */
!function(e,t){"object"===typeof exports&&"object"===typeof module?module.exports=t():"function"===typeof define&&define.amd?define("WebformLogic",[],t):"object"===typeof exports?exports.WebformLogic=t():e.WebformLogic=t()}(this,(function(){return function(){"use strict";var e={d:function(t,n){for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r:function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}e.r(t),e.d(t,{WebformWorker:function(){return l},default:function(){return _}});var n=_createClass((function Reference(){_classCallCheck(this,Reference),this.inflationRate=.02,this.startBenefitAge=65,this.startBenefitPerMonth=1208.26,this.benefitSVAge=65,this.benefitSVPerMonth=635.26,this.returnRateSafe=.04,this.returnRateModerate=.06,this.returnRateBold=.08,this.durationAge=85})),r=_createClass((function Input(){_classCallCheck(this,Input),this.client="John Smith",this.capital=5e4,this.age=45,this.annualIncome=47600})),a=_createClass((function Inflation(e,t){var n=this;_classCallCheck(this,Inflation),this.adjustedIncome=function(){return n.input.annualIncome*Math.pow(1+n.reference.inflationRate,65-n.input.age)},this.stateBenefits=function(){return 12*(n.reference.startBenefitPerMonth+n.reference.benefitSVPerMonth)*Math.pow(1+n.reference.inflationRate,65-n.input.age)},this.finance=function(){return n.adjustedIncome()-n.stateBenefits()},this.reference=e,this.input=t})),i=_createClass((function Capital(e,t){var n=this;_classCallCheck(this,Capital),this.safe=function(){var e=n.finance,t=n.reference.returnRateSafe;return e/t*(1-1/Math.pow(1+t,35))},this.moderate=function(){var e=n.finance,t=n.reference.returnRateModerate;return e/t*(1-1/Math.pow(1+t,35))},this.bold=function(){var e=n.finance,t=n.reference.returnRateBold;return e/t*(1-1/Math.pow(1+t,35))},this.reference=e,this.finance=t})),c=function(){function Report(e,t,n,r){var a=this;_classCallCheck(this,Report),this.safe=function(){var e=a.inflation.adjustedIncome(),t=a.input.capital,n=t*Math.pow(1+a.reference.returnRateSafe,65-a.input.age),r=a.capital.safe(),i=a.reference.returnRateSafe/12;return{ANNUAL_INCOME:e,CURRENT_ASSET:t,ASSET_AT_AGE:n,TARGET_CAPITAL:r,MONTHLY_INVESTMENT:i*(r-n)/(1-Math.pow(1+i,12*(65-a.input.age)))*-1}},this.moderate=function(){var e=a.inflation.adjustedIncome(),t=a.input.capital,n=t*Math.pow(1+a.reference.returnRateModerate,65-a.input.age),r=a.capital.moderate(),i=a.reference.returnRateModerate/12;return{ANNUAL_INCOME:e,CURRENT_ASSET:t,ASSET_AT_AGE:n,TARGET_CAPITAL:r,MONTHLY_INVESTMENT:i*(r-n)/(1-Math.pow(1+i,12*(65-a.input.age)))*-1}},this.bold=function(){var e=a.inflation.adjustedIncome(),t=a.input.capital,n=t*Math.pow(1+a.reference.returnRateBold,65-a.input.age),r=a.capital.bold(),i=a.reference.returnRateBold/12;return{ANNUAL_INCOME:e,CURRENT_ASSET:t,ASSET_AT_AGE:n,TARGET_CAPITAL:r,MONTHLY_INVESTMENT:i*(r-n)/(1-Math.pow(1+i,12*(65-a.input.age)))*-1}},this.reference=e,this.input=t,this.inflation=n,this.capital=r}return _createClass(Report,[{key:"value",value:function(e,t){switch(t){case o.REPORT_TARGETS.SAFE:return this.safe()[e];case o.REPORT_TARGETS.MODERATE:return this.moderate()[e];case o.REPORT_TARGETS.BOLD:return this.bold()[e];default:return null}}}]),Report}(),o=_createClass((function WebformLogic(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;_classCallCheck(this,WebformLogic),e=e||WebformLogic.GetReference(),t=t||WebformLogic.GetInput(),this.inflation=new a(e,t),this.capital=new i(e,this.inflation.finance()),this.report=new c(e,t,this.inflation,this.capital)}));o.REPORT_KEYS={ANNUAL_INCOME:"ANNUAL_INCOME",CURRENT_ASSET:"CURRENT_ASSET",ASSET_AT_AGE:"ASSET_AT_AGE",TARGET_CAPITAL:"TARGET_CAPITAL",MONTHLY_INVESTMENT:"MONTHLY_INVESTMENT"},o.REPORT_TARGETS={SAFE:"SAFE",MODERATE:"MODERATE",BOLD:"BOLD"},o.GetReference=function(){return new n},o.GetInput=function(){return new r};var u=o,s=function(){function WebformWorker(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;_classCallCheck(this,WebformWorker),this.keys={},this.inputs=[],this.decimals=0,this.startListening=function(){e.keys.input.forEach((function(t){var n=t[1],r=document.querySelector('[name="'.concat(n,'"]'));r&&r.addEventListener("change",e.calculate)}))},this.calculate=function(){e.inputs=[],e.decimals=e.parseValue(document.querySelector('[name="number_of_dec"]'));var t=u.GetReference(),n=u.GetInput();console.log("Calculating....");var r=e.keys;console.log(r),r.input.forEach((function(t){e.inputs[t[0]]=(isNaN(e.inputs[t[0]])?0:e.inputs[t[0]])+e.parseValue(document.querySelector('[name="'.concat(t[1],'"]'))),n[t[0]]=e.inputs[t[0]]})),console.log(n),console.log(e.inputs);var a=new u(t,n).report;console.log(a),r.output.forEach((function(t){var n=t[0].split("__"),r=t[1],i=n[0],c=n[1],o=a.value(i,c);document.querySelector('[name="'.concat(r,'"]')).value=e.format(o,e.decimals)}))},this.keys=t||WebformWorker.DEFAULT_KEYS,this.startListening(),this.calculate()}return _createClass(WebformWorker,[{key:"parseValue",value:function(e){if(!e)return 0;switch(e.type){case"number":return e.valueAsNumber||0;case"text":return parseFloat(e.value)||0;default:return 0}}},{key:"format",value:function(e,t){return(e=e.toFixed(t))<0?0:e}}]),WebformWorker}();s.DEFAULT_KEYS={input:[["capital","civicrm_1_contact_1_cg56_custom_314"],["capital","civicrm_1_contact_1_cg56_custom_505"],["age","civicrm_1_contact_1_cg117_custom_762"],["annualIncome","civicrm_1_contact_1_cg117_custom_776"],["number_of_dec","number_of_dec"]],output:[["TARGET_CAPITAL__SAFE","civicrm_1_contact_1_cg117_custom_770"],["TARGET_CAPITAL__MODERATE","civicrm_1_contact_1_cg117_custom_771"],["TARGET_CAPITAL__BOLD","civicrm_1_contact_1_cg117_custom_772"],["MONTHLY_INVESTMENT__SAFE","civicrm_1_contact_1_cg117_custom_773"],["MONTHLY_INVESTMENT__MODERATE","civicrm_1_contact_1_cg117_custom_774"],["MONTHLY_INVESTMENT__BOLD","civicrm_1_contact_1_cg117_custom_775"]]};var l=s,_=u;return t}()}));
//# sourceMappingURL=index.js.map