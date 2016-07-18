import "./styles.css";
import React from "react";
import {FlatButton} from "material-ui";

const AppHeader = ({ button, children, title }) => {
  return (
    <div className="AppHeader">
      <div className="AppHeader-container AppHeader-top">
        <h2 className="AppHeader-top-title">{title}</h2>
        <div className="AppHeader-divider" />
        <div>{button}</div>
      </div>
      <div className="AppHeader-container AppHeader-container--gray">
        {children}
      </div>
    </div>
  );
};

export default AppHeader;
