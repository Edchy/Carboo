import { useRef, useState, useEffect } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { useKey } from "../../customHooks/CustomHooks";
import ThemeChanger from "../ThemeChanger/ThemeChanger";
import Button from "../Button/Button";
import "./settingspanel.css";

// komponent som renderar en "settings-ikon" som vid klick renderar en panel med inställningar
// inspiration hämtad från joyofcode.xyz
export default function SettingsPanel({
  setIdealBs,
  idealBs,
  ruleOf100,
  setRuleOf100,
  ruleOf300,
  setRuleOf300,
  ruleOf500,
  setRuleOf500,
}) {
  const [isOpen, setIsOpen] = useState(false);
  // referenser till panel-divven och ikonen. "Länkas" på som "ref-attribut" på respektive element i JSX.
  const settingsPanelRef = useRef(null);
  const settingsIconRef = useRef(null);

  // Hook vars syfte är att lägga till en lyssnare, om panelen är öppen, som lyssnar efter klick. Så att man kan stänga panelen genom att klicka var som helst utanför. annars, ta bort lyssnaren. returnera funktion som också tar bort lyssnaren när komponenten unmountas.
  useEffect(() => {
    function cb(e) {
      // kolla om klicket är utanför både panelen och ikonen genom att kolla om refsen innehåller klickeventets target. ikonen behöver ingå för att kunna klicka upp panelen i början.
      if (
        settingsPanelRef.current &&
        !settingsPanelRef.current.contains(e.target) &&
        settingsIconRef.current &&
        !settingsIconRef.current.contains(e.target)
      ) {
        // både ovanstående är true? då har klicket skett utanför dessa element och panelen stängs
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("click", cb);
    } else {
      document.removeEventListener("click", cb);
    }
    return () => document.removeEventListener("click", cb);
  }, [isOpen]);

  // custom hook som låter användare trycka bort  med esc. Lyssnar "globalt" efter tangentryck.
  useKey("escape", setIsOpen, isOpen);

  function toggleOpen() {
    setIsOpen(!isOpen);
  }
  function handleSelect(e) {
    setIdealBs(Number(e.target.value));
  }
  function handleReset() {
    setIdealBs(6);
    setRuleOf100(100);
    setRuleOf300(300);
    setRuleOf500(500);
  }
  return (
    <div className="settings-outer">
      {" "}
      {/* ref + dynamisk class baserat på state (för att kunna stila ikonen baserat på om den är öppnad) */}
      <span
        ref={settingsIconRef}
        className={`icon ${isOpen ? "is-clicked" : ""}`}
      >
        <IoSettingsOutline onClick={toggleOpen} />
      </span>
      {/* ref + dynamisk class baserat på state (för att visa/dölja panelen med CSS) */}
      <div
        className={`settings-inner ${isOpen ? "open" : ""}`}
        ref={settingsPanelRef}
      >
        <h3>Settings</h3>
        <label>
          Theme
          <ThemeChanger />
        </label>
        <label>
          Ideal BS
          <select
            value={idealBs}
            onChange={handleSelect}
            className="selectoooor"
          >
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </label>
        <label>
          Carb quotient
          <input
            value={ruleOf500}
            onChange={(e) => setRuleOf500(e.target.value)}
            type="number"
          />
        </label>
        <label>
          Breakfast quotient
          <input
            value={ruleOf300}
            onChange={(e) => setRuleOf300(e.target.value)}
            type="number"
          />
        </label>
        <label>
          Correction quotient
          <input
            value={ruleOf100}
            onChange={(e) => setRuleOf100(e.target.value)}
            type="number"
          />
        </label>
        <Button onClick={handleReset}>Reset</Button>
      </div>
    </div>
  );
}
