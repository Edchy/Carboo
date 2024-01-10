import PropTypes from "prop-types";
import "./button.css";
import { forwardRef } from "react";

// återanvändbar Knapp som tar children, onClick-funktion, class, och type som props

// forwardref används för att kunna skicka med en ref till knappen
const Button = forwardRef(function Button(
  {
    children,
    type = "button", // om ingen type anges blir den av type="button"
    onClick = () => {},
    className = "",
  },
  ref
) {
  return (
    // varje knapp får en default class "btn", utöver de som skickas in som props
    <button
      className={`btn ${className}`}
      onClick={onClick}
      type={type}
      ref={ref}
    >
      {children}
    </button>
  );
});
// lekte lite med proptypes eftersom jag inte använder TS (än).
/*
här definieras att: 
- children måste anges
- knappen måste vara av typ; button, reset eller submit
- onClick måste vara en funktion
- class ska vara av typ "string"
*/
Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  onClick: PropTypes.func,
  className: PropTypes.string,
};

// jag skapade mitt projekt med CRA från början men bytte sedan framåt slutet till att köra Vite. Märkte då att ESLint började klaga på att jag inte använder propTypes överallt. Eftersom jag inte har tid att gå igenom och fixa detta så valde jag att stänga av detta i .eslintrc.cjs med "react/prop-types": "off" tills vidare.

export default Button;
