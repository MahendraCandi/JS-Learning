import {calculateInvestmentResults, formatter} from "../util/investment.js";

export default function CalculatorResults({calculator}) {
  let calculateResults = [];
  let initialInvestment = 0;
  if (calculator.initialInvestment &&
    calculator.annualInvestment &&
    calculator.expectedReturn &&
    calculator.duration) {
    calculateResults = calculateInvestmentResults(calculator);

    initialInvestment =
      calculateResults[0].valueEndOfYear -
      calculateResults[0].interest -
      calculateResults[0].annualInvestment;
  }

  return (
    <table id={"result"}>
      <thead>
      <tr>
        <th>Year</th>
        <th>Investment Value</th>
        <th>Interest (Year)</th>
        <th>Total Interest</th>
        <th>Invested Capital</th>
      </tr>
      </thead>
      <tbody>
      {
        calculateResults.map((result, index) => {
          const totalInterest = result.valueEndOfYear - result.annualInvestment * result.year - initialInvestment;
          const totalAmountInvestment = result.valueEndOfYear - totalInterest;
          return (
            <tr key={index}>
              <td>{result.year}</td>
              <td>{formatter.format(result.valueEndOfYear)}</td>
              <td>{formatter.format(result.interest)}</td>
              <td>{formatter.format(totalInterest)}</td>
              <td>{formatter.format(totalAmountInvestment)}</td>
            </tr>
          );
        })
      }
      </tbody>
    </table>
  );
}
