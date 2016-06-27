import "./styles.css";
import React from "react";
import classnames from "classnames";
import {connect} from "react-redux";
import {push} from "react-router-redux";

const mapDispatchToProps = {
  actionHref: (url) => push(url)
}

const mapStateToProps = (state) => ({})

const Button = ({color, id, className, disabled, icon, mobile, size, title, url, actionHref, onClick}) => {
  const buttonClasses = classnames(
      'Button',
      {
        [`Button--${color}`]: color,
        [`Button--${size}`]: size,
        'Button--mobile': mobile,
        'Button--disabled': disabled,
      },
      className
  );

  const action = onClick || (() => {
    if (!!url) actionHref(url)
  })

  return (
      <div onClick={action} className={buttonClasses}>
        <div className="Button-container" id={id}>
          {icon &&
          <div className="Button-iconContainer">
            {icon}
          </div>
          }
          {title &&
          <div className="Button-title">
            {title}
          </div>
          }
        </div>
      </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Button);
