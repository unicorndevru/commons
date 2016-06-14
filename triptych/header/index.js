import "./styles.css";
import React from "react";
import {FlatButton} from "material-ui";
import Menu from "material-ui/svg-icons/navigation/menu";
import Button from "commons/button";

const AppHeader = ({ buttonChild, children, title }) => {
  return (
    <div className="AppHeader">
      <div className="AppHeader-container AppHeader-container--top">
        <div className="AppHeader-menuBtn">
          <Button icon={<Menu />} size="sm" mobile id="triptych-open-menu" />
        </div>
        <h2>{title}</h2>
        <div className="AppHeader-divider" />
        {buttonChild}
      </div>
      <div className="AppHeader-container AppHeader-container--gray">
        {children}
      </div>
    </div>
  );
};

export default AppHeader;
