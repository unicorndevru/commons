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

const AppHeader = ({children}) => {
  return (
      <div className="AppHeader">
        <div className="AppHeader-menuBtn">
          <FlatButton
              label="Menu"
              default={true}
              icon={<Menu />}
              id="triptych-open-menu"
          />
        </div>
        {children}
      </div>
  );
};

const AppLeftPanel = ({children, active, props}) => {
  const AppLeftPanelClasses = classnames(
      'AppLeftPanel',
      {'is-active': active},
  );

  return (
      <div className={AppLeftPanelClasses} id="triptych-menu">
        <div className="AppLeftPanel-container">
          <div className="AppLeftPanel-header">
            <Link className="AppLeftPanel-logoLink" to="/">Freedrink.club</Link>
          </div>
          { children }
        </div>
        <div className="AppLeftPanel-footer">
          <a className="AppLeftPanel-footerLink" href="javascript:void(0)">Выйти</a>
        </div>
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

export const TriptychMainWrapper = (Component, header, onCloseTo) => ({children, ...props}) =>
    <div className="AppLayout-wrapContainer">
      <AppHeader>{ header }</AppHeader>
      <TriptychMain><Component {...props}/></TriptychMain>
      {children && <TriptychRight onCloseTo={onCloseTo}>{ children }</TriptychRight> }
    </div>

const TriptychView = ({leftPanel = "leftPanel", children, state, setState}) => {
  const closeOnClick = (e) => {
    if(state.leftPanelActive) {
      let el = e.target;
      let inPanel = false;
      do {
        if(el.id === "triptych-menu") {
          inPanel = true;
          break;
        }
      } while(el = el.parentNode)
      if(!inPanel) setState({leftPanelActive: false})
    } else {
      let el = e.target;
      do {
        if(el.id === "triptych-open-menu") {
          setState({leftPanelActive: true})
          break;
        }
      } while(el = el.parentNode)
    }
  }
  return (
      <Grid className="AppLayout" layout="column" onClick={closeOnClick}>
        <AppLeftPanel active={state.leftPanelActive}>{ leftPanel }</AppLeftPanel>
        <div className="AppLayout-wrap">
          <div className="AppLayout-wrapContent">
            {children}
          </div>
        </div>
      </Grid>
  )
}

export const Triptych = decorateWithState(TriptychView, {initialState: {leftPanelActive: false}})
