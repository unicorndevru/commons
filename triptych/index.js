import "./styles.css";
import React from "react";
import {connect} from "react-redux";
import classnames from "classnames";
import Grid from "react-material-grid";
import {IconButton} from "material-ui";
import {decorateWithState, urlInterpolateStrict} from "commons/utils";
import {Link} from "react-router";
import Close from "material-ui/svg-icons/navigation/close";
import WrapContainer from "./wrapContainer/index";
import Main from "./main/index";
import Header from "./header/index";

const AppLeftPanel = ({children, projectTitle, onLogout}) => {
  return (
      <div className="AppLeftPanel" id="triptych-menu">
        <div className="AppLeftPanel-container">
          <div className="AppLeftPanel-header">
            <Link className="AppLeftPanel-logoLink" to="/">{ projectTitle }</Link>
          </div>
          { children }
        </div>
        <div className="AppLeftPanel-footer">
          <a className="AppLeftPanel-footerLink" onClick={onLogout}>Выйти</a>
        </div>
      </div>
  );
};

export const TriptychContent = ({header, children}) =>
    <WrapContainer>
      <Header {...header}/>
      <Main>{children}</Main>
    </WrapContainer>

export const TriptychRight = connect(
    (state) => ({
      params: state.resolve.params,
      query: state.resolve.query
    })
)(({children, onCloseTo, params, query}) => {
  const link = urlInterpolateStrict(onCloseTo, params, query)

  return (<div className="AppRightPanel">
    <div className="AppRightPanel-container">
      <div className="AppRightPanel-header">
        <div className="AppRightPanel-closeBtnContainer">
          <Link to={link}>
            <IconButton><Close /></IconButton>
          </Link>
        </div>
      </div>
      <div className="AppRightPanel-main">
        { children }
      </div>
    </div>
  </div>);
})

export const TriptychMainWrapper = (Component, onCloseTo) => ({children, ...props}) =>
    <div className="Triptych-wrapContent">
      <Component {...props}/>
      {children && <TriptychRight onCloseTo={onCloseTo}>{ children }</TriptychRight> }
    </div>

export const TriptychFullWrapper = (Component, onCloseTo, header = {}) => connect(
    state => ({
      title: state.page.title
    })
)(({children, title, ...props}) =>
    <div className="Triptych-wrapContent">
      <TriptychContent
          header={{
          title,
          ...header
        }}>
        <Component {...props}/>
      </TriptychContent>
      {children && <TriptychRight onCloseTo={onCloseTo}>{ children }</TriptychRight> }
    </div>)

const TriptychView = ({
    leftPanel = "leftPanel",
    projectTitle = "",
    onLogout = () => "",
    children, state, setState
}) => {
  const TriptychClasses = classnames(
      'Triptych',
      {'is-LeftPanelOpened': state.leftPanelActive === 'opened'},
      {'is-LeftPanelHidden': state.leftPanelActive === 'hidden'},
  );
  const closeOnClick = (e) => {
    let el = e.target;
    let inPanel = false;
    let menuOpen = false;
    do {
      if (el.id === "triptych-menu") {
        inPanel = true;
        break;
      }
      if (el.id === "triptych-open-menu") {
        menuOpen = true;
        break;
      }
    } while (el = el.parentNode)
    if (!inPanel && state.leftPanelActive === 'opened' && (typeof window !== 'undefined' && window.innerWidth < 1280)) setState({leftPanelActive: 'hidden'})
    if (menuOpen) switch (state.leftPanelActive) {
      case 'opened':
        setState({leftPanelActive: 'hidden'});
        break;
      case 'hidden':
        setState({leftPanelActive: 'opened'});
        break;
      case 'default':
        setState({leftPanelActive: (typeof window !== 'undefined' && window.innerWidth < 1280) ? 'opened' : 'hidden'});
        break;
    }
  }
  return (
      <Grid className={TriptychClasses} layout="column" onClick={closeOnClick}>
        <AppLeftPanel
            active={state.leftPanelActive}
            projectTitle={projectTitle}
            onLogout={onLogout}
        >{ leftPanel }</AppLeftPanel>
        <div className="Triptych-wrap">
          {children}
        </div>
      </Grid>
  )
}

export const Triptych = decorateWithState(TriptychView, {initialState: {leftPanelActive: 'default'}})
