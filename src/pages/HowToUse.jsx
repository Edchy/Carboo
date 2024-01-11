/* eslint-disable react/no-unescaped-entities */
import { MdPlaylistAddCircle } from "react-icons/md";
import { PageNavButton } from "../components/Button/Button";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function HowToUse() {
  // från en av mina inline-länkar skickar jag med en hash som refererar till ett element på sidan (#conversion-info längre ner). Denna useEffect kollar om det finns en hash i url:en och scrollar till elementet om så är fallet.
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);
  return (
    <section className="page">
      <h2 className="page-title">How to use 💁‍♂️</h2>
      <p className="page-subtitle">Step-by-step instructions</p>
      <p>
        Counting carbs and calculating insulin-dosage is easy-peasy✌️ with
        Carboo.
      </p>
      <p>
        Simply type in the item that you want to search for in the searchbar,
        and hit the <strong>search</strong> button or the <strong>Enter</strong>{" "}
        key on your keyboard.
      </p>
      <p className="search-example">
        pizza <span>🔎</span>
      </p>
      <p>
        Next, specify the amount of the item that you want to add, and press the
        'add' button (<MdPlaylistAddCircle />
        ).
      </p>
      <p>
        Keep doing this for every delicious thing that you are about to eat 🤤.
        Your total will be calculated and displayed for you.
      </p>
      <p>
        Now, if you want to calculate how much insulin is needed for you meal,
        you need to provide your current bloodsugar(BS) and your daily insulin.
        You may also check ✅ if your meal is breakfast or not (you can read
        more about why these are needed <Link to="/diabetes101">here</Link>)
      </p>
      <br />
      <br />
      <p>You may also search for multiple items at once:</p>
      <p className="search-example">
        pasta corn mushrooms fanta <span>🔎</span>
      </p>
      <p>Or directly specify the weight:</p>
      <p className="search-example">
        50g pasta 1lb corn 2oz rice <span>🔎</span>
      </p>
      <p>Or even like this:</p>
      <p className="search-example">
        1 apple and a turkey sandwich<span>🔎</span>
      </p>
      <p>
        <strong>Note!</strong> Not explicitly specifying the weight of the item
        that you want (like in the last example) can lead to less accurate
        results (because apples🍎 varies in size and a turkey🦃 sandwich🥪 could
        be anything really). Always double check the results from a reliable
        source like the <a href="https://usda.gov">USDA</a>.
      </p>
      <div className="page-note">
        <p style={{ fontWeight: "bold", textAlign: "center" }}>Important!</p>
        <p>
          Please be aware that all the food items and nutritional information
          displayed in our results refer to foods that have been cooked or
          prepared in various ways. This means that the data you see is not for
          the raw, uncooked versions of these foods. Cooking methods such as
          boiling, baking, frying, or grilling can alter the nutritional content
          and weight of food, so it's important to consider this when assessing
          your dietary intake.
        </p>
      </div>
      <p id="conversion-info">
        <strong>Also Note!</strong> If you want to add liquids to your meal (for
        example Milk🥛 or Fanta🥤), you also need to specify these in weights.
        For water💧 and most liquids similar to water in density, 1 gram is
        approximately equal to 1 milliliter (ml). However, the density of soda
        like Fanta might be slightly different due to the sugar and carbonation.
      </p>
      <p>
        If you want to be more precise. To convert from grams to centiliters,
        you need to know the density of the substance you're measuring, as the
        conversion depends on it. Try <a href="#">this</a> tool.
      </p>
      <img
        width="300px"
        src={`${import.meta.env.BASE_URL}carboo.png`}
        alt="a cartoon friendly-looking ghost"
      />
      <nav className="page-nav-buttons">
        <PageNavButton path={-1} />
        <PageNavButton path="/" title="home" />
      </nav>
    </section>
  );
}

export default HowToUse;
