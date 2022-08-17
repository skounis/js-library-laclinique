import './css/App.css';
import Lib from './../lib';

class App {
  constructor(){
    let libInstance = new Lib();
    let input = libInstance.getReference();
    console.log(input);
    console.log("Demo loaded!", libInstance);
    this.demoArrowMethod();
  }

  demoArrowMethod = () => {
    console.log("Arrow methods will work");
  }
}

export default App;
