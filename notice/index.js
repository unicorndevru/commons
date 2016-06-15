import "./styles.css";
import React from "react";
import classnames from "classnames";
import {connect} from "react-redux";
import {push} from "react-router-redux";

const Notice = ({className, icon, title, type}) => {
  const rootClasses = classnames(
    'Notice',
    {
      [`Notice--${type}`]: type,
    },
    className
  );

  const onClick = () => {

  }

  return (
    <div className={rootClasses} onClick={onClick}>
      {icon &&
      <div className="Notice-iconContainer">
        {icon}
      </div>
      }
      {title &&
      <div className="Notice-title">
        {title}
      </div>
      }
    </div>
  );
};

export default Notice;
