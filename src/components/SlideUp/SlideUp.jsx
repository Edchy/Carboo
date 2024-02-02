/* eslint-disable react/jsx-key */
import { useEffect, useRef, useState } from "react";
import { useKey } from "../../customHooks/CustomHooks";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import "./slideup.css";

import { useLocalStorage } from "../../customHooks/CustomHooks";

// texten i pratbubblan. plockas ut per index.
const messages = [
  <>
    <h3>BOO! Hope i didn&apos;t scare you.</h3>
    <p>
      Welcome to Carboo. The app that aims to make carb-counting not so scary
      👻.
    </p>
  </>,
  <>
    {" "}
    <p>
      Just type in the delicious stuff that you are about to eat or drink in the
      search-bar above, and hit search or <strong>enter</strong>.<br /> You may
      search for multiple items all at once, like this:{" "}
    </p>
    <p className="example">pizza coke banana cream</p>
  </>,
  <>
    <p>
      {" "}
      You may also directly specify the weight of your foods like this: <br />{" "}
    </p>
    <p className="example">100g pasta 1lb beef 1oz onion</p>
  </>,
  <p>
    <strong>Note</strong> that only weight measurements are supported, not
    volume measurements like l, mL, cups, fl oz, etc. For converting from volume
    to weight, click <Link to="/howtouse#conversion-info">here</Link>.{" "}
    {/* skickar med en hash via länken */}
  </p>,
  <p>boo</p>,
];

export default function SlideUp() {
  const [slideUpIsAlreadyShown, setSlideUpIsAlreadyShown] = useLocalStorage(
    false,
    "slideUpIsAlreadyShown"
  );
  const [isShowing, setIsShowing] = useState(false); // reglerar komponentens visibilitet
  const [speechBubbleText, setSpeechBubbleText] = useState(0); // reglerar vilken text som visas

  // ref till knappen, så att jag kan ge focus till denna när slideUp visas
  const closeBtnRef = useRef(null);

  // setTimeout är en side-effect och därför används useEffect hooken.
  // Efter en viss tid ändras state till true och komponenten blir synlig
  useEffect(() => {
    if (!slideUpIsAlreadyShown) {
      const timer = setTimeout(() => {
        setIsShowing(true);
        setSpeechBubbleText(0);
        setSlideUpIsAlreadyShown(true);
      }, 5000);

      // Clean up - för att cleartimeout inte ska köras direkt, utan istället bara när komponenten unmountas (eller innan effekten körs igen om den har dependencies)
      return () => {
        clearTimeout(timer);
      };
    }
  }, [slideUpIsAlreadyShown, setSlideUpIsAlreadyShown, isShowing]);

  // när komponenten mountas, ge focus till closeBtn
  useEffect(() => {
    if (isShowing && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
  }, [isShowing]);

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
    // försöker tänka på accessibility. role="dialog" och aria-modal="true" för att göra det tydligt att det är en dialogruta som dyker upp.

    <div
      role="dialog"
      aria-modal="true"
      aria-label="Pop-up with information about how to use the app"
      className={`slide-up ${isShowing ? "visible" : ""}`}
    >
      <div className={`speech-bubble ${isShowing ? "fade-in" : "fade-out"}`}>
        {/* rendera meddelande baserat på index i array */}
        {messages[speechBubbleText]}
        {speechBubbleText <= 3 && <span>(tap to continue...)</span>}
        <Button ref={closeBtnRef} onClick={() => setIsShowing(false)}>
          &times;
        </Button>
        <div aria-hidden className="bubble-tip"></div>
      </div>
      <img
        src={`${import.meta.env.BASE_URL}slideUp.png`}
        alt="a friendly ghost"
      />
      {/* overlay för att "dimma" bakgrunden */}
      <ModalOverlay bool={isShowing} />{" "}
    </div>
  );
}
