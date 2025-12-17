import mainLogo from "../assets/investment-calculator-logo.png";

export default function Header() {
  return (
    <header id={"header"}>
      <img src={mainLogo} alt={"Main logo"}/>
      <h1>React Investment Calculator</h1>
    </header>
  );
}
