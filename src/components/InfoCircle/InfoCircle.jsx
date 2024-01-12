import { FiInfo } from "react-icons/fi";
import { TbGhost2 } from "react-icons/tb";

import "./infocircle.css";

// komponent som visar upp en info-text. tar {children} och en annan komponent som prop (för vilken info-texten ska gälla). tar även fler props som modifierar style för om komponenten ska visas till höger eller vänster, samt med vilken offset. default värden används om props inte används.
export default function InfoCircle({
  children,
  component,
  direction = "right",
  offset,
  boxdirecion = "left",
  boxOffset = "100%",
  icon = <FiInfo />,
}) {
  return (
    <div className="info">
      {component}
      <div
        style={{ [direction]: offset ? `${offset}px` : "0px" }}
        className="info-circle"
      >
        {icon}
        <div style={{ [boxdirecion]: boxOffset }} className="infotext-box">
          <h4>
            <span className="icon">
              <TbGhost2 />
            </span>
            Boo! What&apos;s this?{" "}
          </h4>
          {children}
        </div>
      </div>
    </div>
  );
}
