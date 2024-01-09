import "./modaloverlay.css";

// en overlaymodal som dimmar bakgrunden, tar ett in ett boolean-condition som reglerar om komponenten ska visas eller inte.
export default function ModalOverlay({ bool }) {
  return bool ? (
    <div
      aria-hidden="true"
      className={`modal-overlay ${bool ? "show" : ""}`}
    ></div>
  ) : null;
}
