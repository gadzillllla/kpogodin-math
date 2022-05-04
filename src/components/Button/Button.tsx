import cn from 'classnames';
import React from 'react';

import s from './Button.module.css';

export enum ButtonTypeEnum {
  success = 'success',
  error = 'error',
  inactive = 'inactive',
  default = 'default',
}

export interface IButtonPropsType {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  type?: ButtonTypeEnum;
  disabled?: boolean;
}

const Button = (props: IButtonPropsType) => {
  const { onClick, children, className, disabled = false, type = ButtonTypeEnum.default } = props;

  return (
    <button disabled={disabled} className={cn(s.button, s[type], className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
