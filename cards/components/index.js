import "./styles.css";
import React from "react";
import classnames from "classnames";

export const Card = ({isActive = false, children, ...props}) => {
  const cardClasses = classnames(
      'Card',
      {
        'is-active': isActive,
      }
  );
  return (
    <article className={cardClasses} {...props}>
      {children}
    </article>
  )
}
export const CardItem = ({children, ...props}) =>
    <div className="Card-item" {...props}>
      {children}
    </div>

export const CardDivider = () =>
    <div className="Card-divider"/>

export const CardRows = ({children, flexRight = false, ...props}) => <
    div className={"Card-rowList" + (flexRight ? " Card-rowList--flexRight" : "")} {...props}>
  {children}
</div>

export const CardRow = ({children, ...props}) =>
    <div className="Card-rowItem" {...props}>
      { children }
    </div>
