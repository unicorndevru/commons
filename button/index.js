import "./styles.css";
import React from "react";
import classnames from "classnames";
import {Link} from "react-router";

const Button = ({color, id, className, disabled, icon, mobile, size, title, url, onClick}) => {
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
  })

  const buttonContents =  <div className="Button-container" id={id}>
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

  return (!!url ? <Link to={url} className={buttonClasses}>{buttonContents}</Link> :
      <div onClick={action} className={buttonClasses}>
        {buttonContents}
      </div>
  );
};

export default Button
