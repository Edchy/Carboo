import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import Button from "../Button/Button";
import "./dropdownmenu.css";
// dropdown komponenten returnerar en knapp med hamburgarmeny samt själva menyn.
// menyn döljs och visas baserat på state.
// olika ikoner för knappen renderas baserat på samma state
// navLinks är en array som jag skickat med så att jag enkelt kan ändra namn på länkarna och inte behöva uppdatera dessa på två olika ställen
export default function DropDownMenu({ navLinks }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleOpen() {
    setIsOpen(!isOpen);
  }
  return (
    <>
      {" "}
      <Button className="toggle-menu-btn" onClick={toggleOpen}>
        {isOpen ? <AiOutlineClose /> : <RxHamburgerMenu />}
      </Button>
      <nav className={`drop-down-menu ${isOpen ? "open" : ""}`}>
        <ul>
          {/* mappar ut länkarna till en NavLink */}
          {navLinks.map((link) => (
            <li key={link.title}>
              <NavLink onClick={() => setIsOpen(false)} to={link.path}>
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
