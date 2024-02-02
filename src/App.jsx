// import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useLocalStorage } from "./customHooks/CustomHooks";
import Ketones from "./pages/Ketones";
import HowToUse from "./pages/HowToUse";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Diabetes101 from "./pages/Diabetes101";

function App() {
  // Spara det som användaren skriver in för idealBs ändras då dettaa värden är något som sällan behöver ändras. Genom att spara detta i localstorage slipper användaren att mata in detta varje gång den besöker sidan.
  // här har jag asbtraherat bort logiken för detta i en custom hook
  const [idealBs, setIdealBs] = useLocalStorage(6, "idealBs");

  // state för om slideUp ska visas eller inte. behöver finnas här då denna komponent inte re-rendras efter route-byten. tanken är att slide-up ska visas en gång per "session". Men ur ett UX-perspektiv är det egentlgen svårt att få till en sån här sak på ett bra sätt utan att irritera användaren. Som det ser ut nu så kommer slideUp visas varje gång sidan reloadas, så varje besök. för en flitig användare av sidan är detta långt ifrån optimalt. En bättre lösning kanske hade varit att spara state i localstorage så att den "persistar". men då kommer den aldrig visas igen. svår balansgång.
  // skickas ner till slideUp-komponenten där state sätts till true i en useEffect.

  // *deprecated* använder nu localstoragehook istället
  // const [slideUpIsAlreadyShown, setSlideUpIsAlreadyShown] = useState(false);

  const [ruleOf100, setRuleOf100] = useLocalStorage(100, "ruleof100");
  const [ruleOf300, setRuleOf300] = useLocalStorage(300, "ruleof300");
  const [ruleOf500, setRuleOf500] = useLocalStorage(500, "ruleof500");

  return (
    <>
      <BrowserRouter basename="/">
        <Header
          ruleOf100={ruleOf100}
          ruleOf300={ruleOf300}
          ruleOf500={ruleOf500}
          setRuleOf100={setRuleOf100}
          setRuleOf300={setRuleOf300}
          setRuleOf500={setRuleOf500}
          setIdealBs={setIdealBs}
          idealBs={idealBs}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                // slideUpIsAlreadyShown={slideUpIsAlreadyShown}
                // setSlideUpIsAlreadyShown={setSlideUpIsAlreadyShown}
                idealBs={idealBs}
                ruleOf100={ruleOf100}
                ruleOf300={ruleOf300}
                ruleOf500={ruleOf500}
              />
            }
          />
          <Route path="ketones" element={<Ketones pageTitle="Ketones" />} />
          <Route
            path="howtouse"
            element={<HowToUse pageTitle="How to use" />}
          />
          <Route
            path="diabetes101"
            element={<Diabetes101 pageTitle="Diabetes 101" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
