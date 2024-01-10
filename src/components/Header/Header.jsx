import { NavLink, Link } from "react-router-dom";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import SettingsPanel from "../SettingsPanel/SettingsPanel";
import "./Header.css";

const navLinks = [
  { path: "/howtouse", title: "How to use" },
  { path: "/diabetes101", title: "Diabetes 101" },
  { path: "/ketones", title: "Ketones" },
]; // ändra länk namn här för global uppdatering.

export default function Header({
  setIdealBs,
  idealBs,
  ruleOf100,
  setRuleOf100,
  ruleOf300,
  setRuleOf300,
  ruleOf500,
  setRuleOf500,
}) {
  return (
    <header className="main-header">
      <nav role="navigation" aria-label="Main Navigation" className="main-nav">
        <Link className="home-link" to="/">
          <div className="main-logo">
            <img
              src={`${import.meta.env.BASE_URL}brandlogo.png`}
              alt="site logo"
            />
            <div>
              <h1>
                arb
                <span>oo!</span>
              </h1>
              <p>Spooktacular Carb-Counting</p>
            </div>
          </div>
        </Link>
        {/* mappar ut länkarna till en NavLink */}
        <ul className="nav-list">
          {navLinks.map((link) => (
            <li key={link.title}>
              <NavLink to={link.path}>{link.title}</NavLink>
            </li>
          ))}
        </ul>
        <div className="flex-group">
          <DropDownMenu navLinks={navLinks} />
          <SettingsPanel
            ruleOf100={ruleOf100}
            setRuleOf100={setRuleOf100}
            ruleOf300={ruleOf300}
            setRuleOf300={setRuleOf300}
            ruleOf500={ruleOf500}
            setRuleOf500={setRuleOf500}
            setIdealBs={setIdealBs}
            idealBs={idealBs}
          />
        </div>
      </nav>
    </header>
  );
}
