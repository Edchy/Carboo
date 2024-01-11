/* eslint-disable react/no-unescaped-entities */
import { PageNavButton } from "../components/Button/Button";

function Ketones() {
  return (
    <section className="page">
      <h2 className="page-title">What are ketones?</h2>
      <p className="page-subtitle">And why you should avoid them</p>
      <p>
        Imagine your body as a car 🚙 that needs fuel ⛽️ to run. Normally, the
        fuel is sugar 🍬 (glucose), which comes from the food we eat 🍕🌽🍜. In
        type 1 diabetes, though, the body has a bit of a problem using this
        sugar as fuel. This is because type 1 diabetes affects the production of
        insulin, a hormone that acts like a key to let sugar into the cells to
        be used for energy.
      </p>
      <p>
        Now, when the body can't use sugar properly because of the lack of
        insulin, it starts looking for another source of fuel. This is where
        ketones come in. Ketones are chemicals that the body makes when it
        starts breaking down fat for energy, something it does only when it runs
        low on sugar.
      </p>
      <p>
        While ketones can be a backup energy source, there's a catch. If your
        body makes too many ketones, it can lead to a problem called diabetic
        ketoacidosis (DKA), which is serious and needs immediate medical
        attention. This usually happens when your blood sugar is too high for a
        long time, and your body has been making a lot of ketones.
      </p>
      <p>
        While ketones can be a backup energy source, there's a catch. If your
        body makes too many ketones, it can lead to a problem called diabetic
        ketoacidosis (DKA), which is serious and needs immediate medical
        attention. This usually happens when your blood sugar is too high for a
        long time, and your body has been making a lot of ketones.
      </p>
      <p>
        People with type 1 diabetes need to be mindful of their ketone levels,
        especially if their blood sugar is high or if they're sick. High levels
        of ketones can make your blood acidic, and that's not good for your
        body. It can make you feel very sick.
      </p>
      <p>
        To keep an eye on ketones, you can do a simple test at home using either
        a blood ketone meter or urine ketone strips. These tests will tell you
        if you have high levels of ketones in your body. If you do, it’s
        important to get in touch with your doctor right away.
      </p>
      <p>
        In summary, while ketones are an alternative fuel for your body when
        sugar isn't available, in type 1 diabetes, you need to be careful. Keep
        your blood sugar levels under control, check for ketones, and stay in
        regular contact with your healthcare team to stay healthy and safe.
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

export default Ketones;
