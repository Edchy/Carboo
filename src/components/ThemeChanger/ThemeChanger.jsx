import { useEffect } from "react";
import "./themechanger.css";
import { useLocalStorage } from "../../customHooks/CustomHooks";
// definierar mina temans olika färger för css-variabler
const themes = {
  barbie: {
    "-brand-primary": "HSL(180, 98%, 40%)",
    "-brand-primary-darker": "HSL(180, 98%, 30%)",
    "-brand-secondary": "#F983C1",
    "-dark-700": "#333337",
    "-dark-500": "#232B2B",
    "-dark-300": "#666a70",
    "-light": "#fefefa",
    "-bg": "#fefefa",
    "-text": "#16161a",
  },
  darkhorse: {
    "-brand-primary": "HSL(204, 11%, 36%)",
    "-brand-primary-darker": "HSL(204, 11%, 26%)",
    "-brand-secondary": "#414A4C",
    "-dark-700": "#0F1111",
    "-dark-500": "#232B2B",
    "-dark-300": "#d6cab5",
    "-light": "#eef0ea",
    "-bg": "#232B2B",
    "-text": "#eef0ea",
  },
  batman: {
    "-brand-primary": "HSL(42,100%,53%)",
    "-brand-primary-darker": "HSL(42,100%,43%)",
    "-brand-secondary": "HSL(42,100%,53%)",
    "-dark-700": "#0F1111",
    "-dark-500": "#232B2B",
    "-dark-300": "#d6cab5",
    "-light": "#eef0ea",
    "-bg": "#232B2B",
    "-text": "#eef0ea",
  },
  buzz: {
    "-brand-primary": "HSL(255, 83%, 65%)",
    "-brand-primary-darker": "HSL(255, 83%, 50%)",
    "-brand-secondary": "#2cb67d",
    "-brand-tertiary": "#37e3e6",
    "-dark-700": "#16161a",
    "-dark-500": "#333337",
    "-dark-300": "#666a70",
    "-light": "#fefefa",
    "-bg": "#fefefa",
    "-text": "#16161a",
  },
  moon: {
    "-brand-primary": "HSL(20, 92%, 72%)",
    "-brand-primary-darker": "HSL(20, 92%, 55%)",
    "-brand-secondary": "#847cc0",
    "-dark-300": "lightgray",
    "-dark-500": "#0f375f",
    "-dark-700": "black",
    "-light": "#ffe9f9",
    "-bg": "#0f375e",
    "-text": "#ffe9f9",
  },
  oj: {
    "-brand-primary": "HSL(17, 97%, 57%)",
    "-brand-primary-darker": "HSL(17, 97%, 30%)",
    "-brand-secondary": "#ff9b36",
    "-dark-300": "lightgray",
    "-dark-500": "#1f201f",
    "-dark-700": "#682b18",
    "-light": "#ffe9f9",
    "-bg": "#1f201f",
    "-text": "#ffe9f9",
  },
};
export default function ThemeChanger() {
  // sätter state till att hämta värdet för "theme" i localstorage när komponenten mountar (så att valet av tema "stannar kvar" vid reload/återbesök)
  const [theme, setTheme] = useLocalStorage("buzz", "theme");

  // när theme ändras (dependency), loopa igenom themes-objektet vars namn är valt och för varje nyckel ändra css-variablerna i :root(documentElement) till de definierade värdena i objektet.
  useEffect(() => {
    const root = document.documentElement;
    Object.keys(themes[theme]).forEach((key) => {
      root.style.setProperty(`--color${key}`, themes[theme][key]);
    });
  }, [theme]);

  // ändra tema
  function changeTheme(e) {
    setTheme(e.target.value);
  }
  return (
    <select
      onChange={changeTheme}
      name="theme-changer"
      id="theme-changer"
      className="selectoooor"
      value={theme}
    >
      <option value="barbie">Barbie 💝</option>
      <option value="darkhorse">Darkhorse ♘</option>
      <option value="batman">Batman 🦹</option>
      <option value="buzz">Buzz 🧑‍🚀</option>
      <option value="moon">Moonlight 🌕</option>
      <option value="oj">OJ 🍊</option>
    </select>
  );
}
