import cn from 'classnames';
import React from 'react';

import s from './Button.module.css';

export interface IButtonPropsType {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button = (props: IButtonPropsType) => {
  const { onClick, children, className } = props;
  return (
    <button className={cn(s.button, className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
