import "./styles.css";
import React from "react";
import {FlatButton} from "material-ui";
import Menu from "material-ui/svg-icons/navigation/menu";

const AppHeader = ({children, title}) => {
  return (
    <div className="AppHeader">
      <div className="AppHeader-top">
        <div className="AppHeader-menuBtn">
          <FlatButton label="Menu" default={true} icon={<Menu />} id="triptych-open-menu"/>
        </div>
        <h2>{title}</h2>
      </div>
      <div className="AppHeader-container">
        {children}
      </div>
    </div>
  );
};

export default AppHeader;
