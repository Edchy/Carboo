import { useState } from "react";
import { useLocalStorage } from "../customHooks/CustomHooks";
import InfoBar from "../components/InfoBar/InfoBar";
import Main from "../components/Main/Main";
import { Helmet } from "react-helmet";

export default function Home({
  idealBs,
  slideUpIsAlreadyShown,
  setSlideUpIsAlreadyShown,
  ruleOf100,
  ruleOf300,
  ruleOf500,
}) {
  // detta state lever här för att kunna skickas ner till flera barn.
  const [bloodSugar, setBloodSugar] = useState("");
  const [isBreakfastToggled, setIsBreakfastToggled] = useState(false);

  // Spara det som användaren skriver in inputet för hur mycket insulin som används dagligen då detta värde är något som sällan behöver ändras. Genom att spara detta i localstorage slipper användaren att mata in detta varje gång den besöker sidan. bloodsugar däremot, är ett ständigt ändrande värde så detta sparas inte i ls.
  // här har jag asbtraherat bort logiken för detta i en custom hook
  const [dailyInsulin, setDailyInsulin] = useLocalStorage("", "dailyInsulin");

  return (
    <>
      <Helmet>
        <title>Carboo</title>
      </Helmet>
      <InfoBar
        setBloodSugar={setBloodSugar}
        bloodSugar={bloodSugar}
        setDailyInsulin={setDailyInsulin}
        dailyInsulin={dailyInsulin}
        isBreakfastToggled={isBreakfastToggled}
        setIsBreakfastToggled={setIsBreakfastToggled}
        idealBs={idealBs}
      />
      <Main
        isBreakfastToggled={isBreakfastToggled}
        bloodSugar={bloodSugar}
        dailyInsulin={dailyInsulin}
        idealBs={idealBs}
        slideUpIsAlreadyShown={slideUpIsAlreadyShown}
        setSlideUpIsAlreadyShown={setSlideUpIsAlreadyShown}
        ruleOf100={ruleOf100}
        ruleOf300={ruleOf300}
        ruleOf500={ruleOf500}
      />
    </>
  );
}
