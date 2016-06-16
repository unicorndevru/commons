import "./styles.css";
import React from "react";
import {FlatButton} from "material-ui";
import Menu from "material-ui/svg-icons/navigation/menu";
import Button from "commons/button";

const AppHeader = ({ button, children, title }) => {
  return (
    <div className="AppHeader">
      <div className="AppHeader-container AppHeader-top">
        <div className="AppHeader-menuBtn">
          <Button icon={<Menu />} size="sm" mobile id="triptych-open-menu" />
        </div>
        <h2 className="AppHeader-top-title">{title}</h2>
        <div className="AppHeader-divider" />
        {button}
      </div>
      <div className="AppHeader-container AppHeader-container--gray">
        {children}
      </div>
    </div>
  );
};

export default AppHeader;
