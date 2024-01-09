import { useEffect, useState } from "react";
import { useKey } from "../../customHooks/CustomHooks";
import Button from "../Button/Button";
import "./warningbox.css";
import { NavLink } from "react-router-dom";

// komponent som renderar en varning om användaren knappar in ett lågt eller högt värde.
export default function WarningBox({ bloodSugar }) {
  // om värde finns, och om värdet är över 12 eller under 4.2 är isActive = True.
  const [isActive, setIsActive] = useState(
    Boolean(bloodSugar && (bloodSugar > 12 || bloodSugar < 4.2)) // behövde casta om detta till Bool av nån anledning.
  );

  // uppdatera isActive om värdet bloodSugar ändras. Dependency = bloodSugar.
  useEffect(() => {
    setIsActive(bloodSugar && (bloodSugar > 12 || bloodSugar < 4.2));
  }, [bloodSugar]);

  // custom hook som låter användare trycka bort varningen med esc eller enter
  useKey("escape", setIsActive, isActive, "enter");

  // om isActive = True ges klassen "active" vilket triggar en css-animation som gör att "boxen" visas i UI.
  // beroende på vilket värde bloodSugar är renderas olika varningstexter
  return (
    <div className={`warning ${isActive ? "active" : ""}`}>
      {bloodSugar >= 20 && (
        <p>
          <span>🚨 Your bloodsugar is VERY HIGH 🚨</span> Double-check your
          values and correct them if necessary. If your bloodsugar is not
          getting lower within a couple of hours, seek medical guidance and
          check for <NavLink to="/ketones">Ketones</NavLink>
        </p>
      )}
      {bloodSugar > 12 && bloodSugar < 20 && (
        <p>
          <span>🚨 Your bloodsugar is HIGH 🚨</span> Double-check your values
          and correct them if necessary. Take extra insulin.
        </p>
      )}
      {bloodSugar < 4.2 && (
        <p>
          <span>🚨 Your bloodsugar is LOW 🚨</span> Double-check your values and
          eat and/or drink something sweet. <strong>DO NOT</strong> take insulin
          right now!
        </p>
      )}
      <Button onClick={() => setIsActive(false)}>I Understand</Button>
    </div>
  );
}
