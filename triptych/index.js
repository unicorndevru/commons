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
import {decorateWithState} from "commons/utils";

import Menu from 'material-ui/svg-icons/navigation/menu';

const AppHeader = ({ children, toggle }) => {
  return (
    <div className="AppHeader">
      <div className="AppHeader-menuBtn">
        <FlatButton
          label="Menu"
          default={true}
          icon={<Menu />}
          onClick={toggle}
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


const TriptychView = ({leftPanel = "leftPanel", rightPanel, header = "", children, state, setState}) => {
  const toggleMenu = () => setState({leftPanelActive: !state.leftPanelActive})
  return (
    <Grid className="AppLayout" layout="column">
      <AppLeftPanel active={state.leftPanelActive} toggle={toggleMenu}>{ leftPanel }</AppLeftPanel>
      <div className="AppLayout-wrap">
        <AppHeader toggle={toggleMenu}>{ header }</AppHeader>
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

export default decorateWithState(TriptychView, {initialState: {leftPanelActive: true}})
