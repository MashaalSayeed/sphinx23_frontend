import React, {
  useEffect,
  useState,
} from "react";
import toggle from "../../images/toggle.png";

function SidebarAdmin(props) {
  const {
    data,
    optactive,
    setactive,
    isSidebar,
    SetSidebar,
  } = props;
  const [anim, setAnim] = useState({
    animation: "slideIn 300ms ease-in-out",
    animationDelay: "200ms",
    animationFillMode: "forwards",
  });
  const [btnAnim, setBtnAnim] = useState({
    transform: "rotate(-90deg)",
    animation: "slideOut 300ms ease-in",
    animationFillMode: "both",
  });
  useEffect(() => {}, [isSidebar]);

  return (
    <>
      <div className={"sidebar"} style={anim}>
        <div className="sidebar-header">
          <div className="sidebar-title">
            {data.title}
          </div>
          <img
            className={
              isSidebar
                ? "sidebar-toggle rotate0"
                : `sidebar-toggle rotate`
            }
            src={toggle}
            onClick={() => {
              SetSidebar(!isSidebar);
              setAnim({
                animation:
                  "slideOut 300ms ease-in",
                animationFillMode: "both",
              });
              setBtnAnim({
                animation:
                  "slideInSidebar 300ms ease-in",

                animationFillMode: "forwards",
              });
            }}
          ></img>
        </div>
        <div className="sidebar-options">
          {data.options.map((opt, i) => (
            <div
              className={`sidebar-opt`}
              id={opt}
              key={i}
              onClick={() => {
                setactive(opt);
              }}
            >
              {opt}
              {optactive === opt ? (
                <div className="sidebar-active"></div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div
        onClick={() => {
          SetSidebar(!isSidebar);
          setAnim({
            animation:
              "slideIn 300ms ease-in-out",
            animationFillMode: "forwards",
          });
          setBtnAnim({
            transform: "rotate(-90deg)",
            animation:
              "slideOut 300ms ease-in-out",
            animationFillMode: "both",
          });
        }}
        className="closed-sidebar"
        style={btnAnim}
      >
        <div className="closed-sidebarLine"></div>
        <div className="closed-sidebarLine"></div>
        <div className="closed-sidebarLine"></div>
      </div>
    </>
  );
}

export default SidebarAdmin;
