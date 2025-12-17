export default function CalculatorInput({calculator, changeCalculatorInput}) {
  return (
    <div id={"user-input"}>
      <div className={"input-group"}>
        <div>
          <label htmlFor="initial-investment">Initial Investment</label>
          <input type="number"
                 id={"initial-investment"}
                 name={"initialInvestment"}
                 value={calculator.initialInvestment}
                 onChange={changeCalculatorInput}
          />
        </div>

        <div>
          <label htmlFor="annual-investment">Annual Investment</label>
          <input type="number"
                 id={"annual-investment"}
                 name={"annualInvestment"}
                 value={calculator.annualInvestment}
                 onChange={changeCalculatorInput}
          />
        </div>
      </div>

      <div className={"input-group mt-2"}>
        <div>
          <label htmlFor="expected-return">Expected Return</label>
          <input type="number"
                 id={"expected-return"}
                 name={"expectedReturn"}
                 value={calculator.expectedReturn}
                 onChange={changeCalculatorInput}
          />
        </div>

        <div>
          <label htmlFor="duration">Duration</label>
          <input type="number"
                 id={"duration"}
                 name={"duration"}
                 value={calculator.duration}
                 onChange={changeCalculatorInput}
          />
        </div>
      </div>
    </div>
  );
}
