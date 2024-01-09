/* eslint-disable react/no-unescaped-entities */
import { IoSettingsOutline } from "react-icons/io5";

function Diabetes101() {
  return (
    <section className="page">
      <h2 className="page-title">Diabetes 101</h2>
      <p className="page-subtitle">The basics</p>
      <p>
        Type 1 diabetes is a condition where the body can't make insulin, a
        hormone that helps turn food into energy. It's like having a car without
        a key; the fuel (sugar from food) can't be used properly. People with
        type 1 diabetes manage their condition by taking insulin and keeping a
        close eye on their diet and blood sugar levels. With careful management,
        they can lead normal, active lives.
      </p>
      <p>
        In order to calculate how much insulin is needed, a common practice is
        to use the 500-rule (for calculating how much is needed for carbs), the
        300-rule (for calculating how much is needed for breakfast-carbs) and
        the 100-rule (for calculating how much is needed to adjust a high BS).
      </p>
      <div className="page-aq">
        <p style={{ fontWeight: "bold", textAlign: "center" }}>
          Why is it different for breakfast?
        </p>
        <p>
          In the morning, the body is less sensitive to insulin, due to hormones
          released during the night making the body less receptive to insulin.
          Therefore, as a rule, a larger dose of insulin is needed for
          breakfast, compared to other meals during the day.
        </p>
      </div>
      <p>
        These rules are rough guidelines and are very useful for learning how to
        dose insulin. In practice, however, one needs to consider more than just
        the carbohydrate amount, and sometimes it's necessary to adjust the
        numbers 500, 300, and 100 to better suit you. For example, the number
        450 might be more suitable than 500, and this is something you will
        learn over time (of course, you should discuss this with your doctor and
        nurse).
      </p>
      <p>
        These values can all be adjusted in the settings (<IoSettingsOutline />
        ).
      </p>
      <p>
        Keep in mind that insulin dosage is affected by many factors, some of
        which are:
      </p>
      <ul className="page-list">
        <li>How much you move before and after the meal.</li>
        <li>The blood sugar level before the meal.</li>
        <li>
          The type of carbohydrates you eat. If you eat fast carbohydrates, your
          blood sugar can rise quickly even if you dose correctly. Eating slow
          carbohydrates can actually cause a drop in blood sugar because slow
          carbohydrates take longer to absorb.
        </li>
        <li>Insulin absorption can vary.</li>
      </ul>
      <p>
        Also, keep in mind the following: If a child who has received their
        calculated dose of insulin does not finish the meal for which the dose
        was calculated, it is important to compensate for the missed
        carbohydrates with a sandwich or fruit (equivalent amount of
        carbohydrates not eaten) to avoid low blood sugar.
      </p>
    </section>
  );
}

export default Diabetes101;
