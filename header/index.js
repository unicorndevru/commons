import "./styles.css";
import React from "react";
import {connect} from "react-redux";
import classnames from "classnames";
import Grid from "react-material-grid";
import {FlatButton, IconButton, LinearProgress, Paper, RaisedButton, TextField} from "material-ui";
import {decorateWithState, urlInterpolateStrict} from "commons/utils";
import {Link} from "react-router";
import Menu from "material-ui/svg-icons/navigation/menu";
import Close from "material-ui/svg-icons/navigation/close";

const AppHeader = ({children, title}) => {
  return (
    <div className="AppHeader">
      <div className="AppHeader-menuBtn">
        <FlatButton label="Menu" default={true} icon={<Menu />} id="triptych-open-menu"/>
      </div>
      <h2>{title}</h2>
      <div className="AppHeader-container">
        {children}
      </div>
    </div>
  );
};

export default AppHeader;
