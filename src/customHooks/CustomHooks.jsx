import { useRef, useEffect, useState } from "react";

// Custom hook #1
//returnerar tidigare värde (renderingen innan den senaste)
export function usePrev(val) {
  // useRef används så att det förra värdet kan sparas genom renderingar.
  const ref = useRef();
  // uppdatera ref när argumentet uppdateras
  useEffect(() => {
    ref.current = val;
  });
  return ref.current;
}

// Custom hook #2
// Hämtar och sparar state till localstorage
// om värde finns i localstorage returneras det, annars ett fallback value (det värde som skickas in som det första argumentet). || operatorn returnerar det första värdet om det är truthy(vilket det inte kommer vara initialt, då ls är tomt), annars returneras det andra.
// denna hook blev lite mer komplicerad när jag kom på att jag även ville använda denna till att spara min userList (type object). Eftersom localstorage endast kan lagra strings behöver jag parsa och stringifya object. men jag vill endast göra detta om det är ett object som ska sparas, därför provas det att parsa i ett try block annars bara retunera värdet. och i useEffect, som uppdaterar localstorage, testas värdet om det är ett object som inte är null och stringifyas om true. puh! mycket jobb, men nu kan denna komponent återanvändas på många ställen.
export function useLocalStorage(firstState, key) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    try {
      return storedValue ? JSON.parse(storedValue) : firstState;
    } catch (err) {
      return storedValue || firstState;
    }
  });
  useEffect(() => {
    const valueForStoring =
      typeof value === "object" && value !== null
        ? JSON.stringify(value)
        : value;
    localStorage.setItem(key, valueForStoring);
  }, [value, key]);

  return [value, setValue];
}

// Hook #3 - lyssna efter keydown, om keydown är parameter som skickats in som "key1" eller "key2", kör funktionen som skickats in som "action". "dependency" kollar om lyssnare ska läggas till eller tas bort.
export function useKey(key1, action, dependency, key2) {
  useEffect(() => {
    function callback(e) {
      // jämför i lowercase så att parameter som skickas in när useKey anropas är case-insensitive
      const pressedKey = e.code.toLowerCase();
      // kolla om knappen som trycks är samma som skickats in, eller om det finns en till key och om den tryckts
      if (
        pressedKey === key1.toLowerCase() ||
        (key2 && pressedKey === key2.toLowerCase())
      ) {
        action(false);
      }
    }
    if (dependency) {
      document.addEventListener("keydown", callback);
    } else {
      document.removeEventListener("keydown", callback);
    }
    return () => document.removeEventListener("keydown", callback);
  }, [dependency, action, key1, key2]);
}
