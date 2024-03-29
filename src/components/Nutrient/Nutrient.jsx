import { useState } from "react";
// import { IoMdAdd } from "react-icons/io";
import { MdPlaylistAddCircle } from "react-icons/md";
import Button from "../Button/Button";
import NumberInput from "../NumberInput/NumberInput";
import "./nutrient.css";

// Komponent som returnerar en <li> med info om varje sökresultat.

export default function Nutrient({ searchResult, onAdd }) {
  // definierar state för att kunna via input låta användaren välja antal gram att lägga till.
  // sätts initialt till objektets värde för serving-size (default 100g)
  const [grams, setGrams] = useState(searchResult.serving_size_g);
  // genom att använda state uppdateras den här variabeln dynamiskt när state för grams ändras (derived state).
  let carbs =
    searchResult.carbohydrates_total_g * (grams / searchResult.serving_size_g);
  return (
    <li className="nutrient">
      <div className="nutrient-info">
        <h3 className="nutrient-title">{searchResult.name}</h3>
        {/* Komponent som tillåter reglering av hur många gram av en nutrient man vill lägga till. */}
        <NumberInput title="Grams" grams={grams} setGrams={setGrams} />
        <p>
          Carbs: <span className="nutrient-total">{carbs.toFixed(1)}g</span>
        </p>
      </div>
      {/* Här har det "prop-drillats" ordentligt. onAdd har skickats ner genom många komponenter. Endast för att användas här i komponentens onClick prop (kanske kunde lösas bättre med props.children). Funktionen tar ett nytt objekt som parameter och kopierar in alla properties från objektet som skickades in som prop till komponenten. Men totala kolhydrater och serving-size propertiesen skrivs över med de nya, användar-uppdaterade värdena */}
      <Button
        className="add-btn"
        onClick={() =>
          onAdd({
            ...searchResult,
            serving_size_g: grams,
            carbohydrates_total_g: carbs,
          })
        }
      >
        <MdPlaylistAddCircle />
      </Button>
    </li>
  );
}
