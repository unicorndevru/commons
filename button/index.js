import "./styles.css";
import React from "react";
import classnames from "classnames";

const Button = ({children, color, className, disabled, id, icon, mobile, size, title, onClick = () => null}) => {
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

  return (
    <div className={buttonClasses} id={id}>
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
  );
};

export default Button;
