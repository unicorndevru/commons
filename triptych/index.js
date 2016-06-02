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

const AppHeader = ({children, toggle}) => {
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

const AppLeftPanel = ({children, active}) => {
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

export const TriptychMain = ({children}) =>
    <div className="AppMain">
      { children }
    </div>;

export const TriptychRight = connect(
    (state) => ({
      params: state.resolve.params,
      query: state.resolve.query
    })
)(({children, onCloseTo, params, query}) => {
  const link = urlInterpolateStrict(onCloseTo, params, query)

  return (<div className="AppRightPanel">
    <div className="AppRightPanel-closeBtnContainer">
      <Link to={link}>
        <IconButton>
          <Close />
        </IconButton>
      </Link>
    </div>
    { children }
  </div>);
})

export const TriptychMainWrapper = (Component, onCloseTo) => ({children, ...props}) =>
    <div className="AppLayout-wrapContainer">
      <TriptychMain><Component {...props}/></TriptychMain>
      {children && <TriptychRight onCloseTo={onCloseTo}>{ children }</TriptychRight> }
    </div>

const TriptychView = ({leftPanel = "leftPanel", header = "", children, state, setState}) => {
  const toggleMenu = () => setState({leftPanelActive: !state.leftPanelActive})
  return (
      <Grid className="AppLayout" layout="column">
        <AppLeftPanel active={state.leftPanelActive} toggle={toggleMenu}>{ leftPanel }</AppLeftPanel>
        <div className="AppLayout-wrap">
          <AppHeader toggle={toggleMenu}>{ header }</AppHeader>
          <div className="AppLayout-wrapContent">
            <div className="AppLayout-paneGutter"/>
            {children}
            <div className="AppLayout-paneGutter"/>
          </div>
        </div>
      </Grid>
  )
}

export const Triptych = decorateWithState(TriptychView, {initialState: {leftPanelActive: false}})
