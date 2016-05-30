import "./styles.css";
import React from "react";
import {connect} from "react-redux";
import classnames from 'classnames';
import Grid from "react-material-grid";
import {
  FlatButton,
  IconButton,
  LinearProgress,
  Paper,
  RaisedButton,
  TextField,
} from "material-ui";

import Menu from 'material-ui/svg-icons/navigation/menu';

const AppHeader = ({ children }) => {
  return (
    <div className="AppHeader">
      <div className="AppHeader-menuBtn">
        <FlatButton
          label="Menu"
          default={true}
          icon={<Menu />}
        />
      </div>
      {children}
    </div>
  );
};

const AppLeftPanel = ({ children, active }) => {
  const AppLeftPanelClasses = classnames(
    'AppLeftPanel',
    {'is-active': active},
  );

  return (
    <div className={AppLeftPanelClasses}>
      { children }
    </div>
  );
};

const AppMain = ({children}) =>
  <div className="AppMain">
    { children }
  </div>;

const AppRightPanel = ({children}) =>
  <div className="AppRightPanel">
    { children }
  </div>;


const TriptychView = ({leftPanel, rightPanel, header = "", children}) => {
  return (
    <Grid className="AppLayout" layout="column">
      {leftPanel && <AppLeftPanel>{ leftPanel }</AppLeftPanel>}
      <div className="AppLayout-wrap">
        <AppHeader>{ header }</AppHeader>
        <div className="AppLayout-wrapContent">
          <div className="AppLayout-paneGutter" />
          <AppMain>{ children }</AppMain>
          {rightPanel && <AppRightPanel>{rightPanel}</AppRightPanel>}
          <div className="AppLayout-paneGutter" />
        </div>
      </div>
    </Grid>
  )
}

export default TriptychView
