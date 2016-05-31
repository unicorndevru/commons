import "./styles.css";
import React from "react";
import {Paper} from "material-ui"

export const Card = ({isActive = false, children, ...props}) =>
    <Paper zDepth={isActive ? 2 : 1} className="Card" {...props}>
      {children}
    </Paper>

export const CardItem = ({children, ...props}) =>
    <div className="Card-item" {...props}>
      {children}
    </div>

export const CardDivider = () =>
    <div className="Card-divider"/>

export const CardRows = ({children, flexRight = false, ...props}) => <
    div className={"Card-rowList" + (flexRight ? " u-flexRight" : "")} {...props}>
  {children}
</div>

export const CardRow = ({children, ...props}) =>
    <div className="Card-rowItem" {...props}>
      { children }
    </div>