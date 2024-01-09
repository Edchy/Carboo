/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { useKey } from "../../customHooks/CustomHooks";
import { NavLink } from "react-router-dom";
import Button from "../Button/Button";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import "./slideup.css";

// texten i pratbubblan. plockas ut per index.
const messages = [
  <>
    <h3>BOO! Hope i didn&apos;t scare you.</h3>
    <p>
      Welcome to Carboo. The app that aims to make carb-counting not so scary
      👻.
    </p>
  </>,
  <p>
    Just type in the delicious stuff that you are about to eat or drink in the
    search-bar above, and hit <strong>enter</strong>.<br /> You may search for
    multiple items all at once, like this: <em>apple milk bread fanta...</em>
  </p>,
  <p>
    {" "}
    You may also directly specify the weight of your foods like this: <br />{" "}
    <em>100g pasta 1lb beef 1oz onion</em>
  </p>,
  <p>
    <strong>Note</strong> that only weight measurements are supported, not
    volume measurements like l, mL, cups, fl oz, etc. For converting from volume
    to weight, click <NavLink to="/howtouse">here</NavLink>.
  </p>,
  <p>boo</p>,
];

export default function SlideUp({
  slideUpIsAlreadyShown,
  setSlideUpIsAlreadyShown,
}) {
  const [isShowing, setIsShowing] = useState(false); // reglerar komponentens visibilitet
  const [speechBubbleText, setSpeechBubbleText] = useState(0); // reglerar vilken text som visas
  //
  // setTimeout är en side-effect och därför används useEffect hooken.
  // Efter en viss tid ändras state till true och komponenten blir synlig
  useEffect(() => {
    if (!slideUpIsAlreadyShown) {
      const timer = setTimeout(() => {
        setIsShowing(true);
        setSpeechBubbleText(0);
        setSlideUpIsAlreadyShown(true);
      }, 1000);
      // Clean up - för att cleartimeout inte ska köras direkt, utan istället bara när komponenten unmountas (eller innan effekten körs igen om den har dependencies)
      return () => {
        clearTimeout(timer);
      };
    }
  }, [setSlideUpIsAlreadyShown, slideUpIsAlreadyShown]);

  //custom hook som låter användare trycka bort slideUp med esc. Lyssnar "globalt" efter tangentryck.
  useKey("escape", setIsShowing, isShowing);

  // lyssna efter "click". ändra state++ vid klick.
  useEffect(() => {
    function handleClick() {
      setSpeechBubbleText((prev) => prev + 1);
      if (speechBubbleText === 3) setIsShowing(false);
    }
    if (isShowing) {
      document.addEventListener("click", handleClick);
    } else {
      document.removeEventListener("click", handleClick);
    }
    return () => document.removeEventListener("click", handleClick);
  }, [isShowing, speechBubbleText]);

  return (
    //e class baserat på state
    <div className={`slide-up ${isShowing ? "visible" : ""}`}>
      <div className={`speech-bubble ${isShowing ? "fade-in" : "fade-out"}`}>
        {/* rendera meddelande baserat på index i array */}
        {messages[speechBubbleText]}
        {speechBubbleText <= 3 && <span>(tap to continue...)</span>}
        <Button onClick={() => setIsShowing(false)}>&times;</Button>
        <div aria-hidden className="bubble-tip"></div>
      </div>
      <img src="slideUp.png" alt="a friendly ghost" />
      <ModalOverlay bool={isShowing} />
    </div>
  );
}
