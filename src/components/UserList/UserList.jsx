import { useEffect, useState } from "react";
import { usePrev } from "../../customHooks/CustomHooks";
import UserListItem from "../UserListItem/UserListItem";
import "./userlist.css";

// rendera listan med nutrienter som användaren lägger till
export default function UserList({ userList, onDelete }) {
  // Jag ville på något sätt öka UX genom att låta användaren få feedback på när man lägger till objekt i listan eller när ett objekt som redan finns i listan uppdateras. En visuell markering som visar vad det är som händer när "lägga till knappen" klickas. Visste inte riktigt hur jag skulle göra detta och jag provade olika lösningar utan större framgång. Tillslut efter massa googlande, stack overflowande och dividerande med chatGPT hittade jag en lösning som fungerade. Jag kan inte säga att jag helt och hållet förstår lösningen, då den introducerade, för mig, ett nytt koncept - Set().

  // Min tanke var att varje gång den här komponenten renderas (vilket den gör varje gång ett objekt uppdateras eller läggs till i userList) så ska den tidigare userList jämföras med den nya. Om något har ändrats så ska det elementet få ett klassnamn och en animation via klassnamnet.

  // state att lagra nya eller uppdaterade objekt. Set tillåter inte dubbletter.
  const [newOrUpdated, setNewOrUpdated] = useState(new Set());

  // i denna variabel sparas det tidigare värdet för userList (från renderingen innan). detta genom att använda en "custom hook" som importeras från min customhooks fil.
  const prevUserList = usePrev(userList);

  // körs när userList och prevUserList uppdateras och jämför dessa två för att se om något är nytt eller ändrat
  useEffect(() => {
    // if-satsen är här för att prevUserList inte kommer finnas på första render.
    if (prevUserList) {
      // spara nya eller uppdaterade objekt
      const newNewOrUpdated = new Set();

      // loopa igenom den nuvarande listan och hitta objekt med samma namn i förra listan. spara i variabel.
      userList.forEach((item) => {
        const prevItem = prevUserList.find((prev) => prev.name === item.name);

        // om prevItem är false(namnet finns inte med i förra listan). Då betyder det att det är ett nytt objekt och ska läggas till.
        // eller om värdet för nyckeln serving_size_g inte är samma i gamla och nya listan. Då är värdet uppdaterat och ska läggas till.
        if (!prevItem || prevItem.serving_size_g !== item.serving_size_g) {
          newNewOrUpdated.add(item.name);
        }
      });
      // om settets size nu är större än noll så finns det nya eller uppdaterade objekt och state sätts då till detta.
      if (newNewOrUpdated.size > 0) {
        setNewOrUpdated(newNewOrUpdated);
      }
    }
    // efter en halv sekund "nollställs" state, tillräckligt för att kunna ge en indikation i UI att något har uppdaterats
    const timer = setTimeout(() => setNewOrUpdated(new Set()), 500);
    return () => clearTimeout(timer);
  }, [userList, prevUserList]);

  return (
    <ul className="user-list">
      {/* om det finns något i listan - "mappar ut" varje objekt till instans av en komponent som tar in objektet som prop */}
      {userList.length > 0 ? (
        userList.map((item) => (
          <UserListItem
            onDelete={onDelete}
            item={item}
            key={item.name}
            // Kolla om item.name finns i changedItems (t.ex "bananas"), isf ge klass .
            className={newOrUpdated.has(item.name) ? "highlight" : ""}
          />
        ))
      ) : (
        <p className="empty-text">🍌 🍉 🥝 🍋</p> // om inget finns visa "banan melon kiwi och citron"
      )}
    </ul>
  );
}
