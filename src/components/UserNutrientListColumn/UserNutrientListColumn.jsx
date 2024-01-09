import { useEffect, useRef, useState } from "react";
import UserList from "../UserList/UserList";
import UserTotalBox from "../UserTotalBox/UserTotalBox";
import "./usernutrientlistcolumn.css";

// visar upp listan för valda objekt samt den slutgiltiga uträkningen av kolhydrater + insulin
export default function UserNutrientListColumn({
  userList,
  setUserList,
  onDelete,
  dailyInsulin,
  bloodSugar,
  isBreakfastToggled,
  idealBs,
  ruleOf100,
  ruleOf300,
  ruleOf500,
}) {
  // state som hanterar bool för om användaren scrollar eller inte
  const [isScrolling, setIsScrolling] = useState(false);
  const sectionRef = useRef(null); // referens till sektionen som returneras i JSX och får denna variabel som ref-attribut.

  useEffect(() => {
    let timeout;
    // funktion som körs vid scroll, ändrar state för scrolling till true, detta state används sedan för att sätta opaciteten på knappen (opacity: 0 om true). timeout ändrar sedan tillbaks state till false efter 100ms så att knappen syns igen (opacity: 1).
    function handleScroll() {
      setIsScrolling(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsScrolling(false), 100);
    }
    // lägg på lyssnaren på reffen
    const userListCol = sectionRef.current;
    userListCol.addEventListener("scroll", handleScroll);
    return () => {
      // returnera clean-up funktion och tabort timeout
      userListCol.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section ref={sectionRef} className="user-list-column">
      <UserList userList={userList} onDelete={onDelete} />
      <UserTotalBox
        bloodSugar={bloodSugar}
        userList={userList}
        dailyInsulin={dailyInsulin}
        setUserList={setUserList}
        isBreakfastToggled={isBreakfastToggled}
        isScrolling={isScrolling} // variabeln skickas ned för att hanteras där den ska påverka utseende för en knapp.
        idealBs={idealBs}
        ruleOf100={ruleOf100}
        ruleOf300={ruleOf300}
        ruleOf500={ruleOf500}
      />
    </section>
  );
}
