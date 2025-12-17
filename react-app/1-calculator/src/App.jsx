import mainLogo from './assets/investment-calculator-logo.png';
import {calculateInvestmentResults, formatter} from "./util/investment.js";
import {useState} from "react";
import Header from "./components/Header.jsx";
import CalculatorInput from "./components/CalculatorInput.jsx";
import CalculatorResults from "./components/CalculatorResults.jsx";


function App() {

  const [calculator, setCalculator] = useState({
    initialInvestment: '',
    annualInvestment: '',
    expectedReturn: '',
    duration: ''
  })

  const changeCalculatorInput = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setCalculator(prevState => ({
      ...prevState,
      [name]: +value
    }))
  }

  return (
    <>
      <Header/>
      <CalculatorInput calculator={calculator} changeCalculatorInput={changeCalculatorInput} />
      <CalculatorResults calculator={calculator} />
    </>
  );
}

export default App
