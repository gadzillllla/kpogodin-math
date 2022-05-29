import cn from 'classnames';
import React from 'react';
import { sounds } from 'services/audioService';
import { ElementTypeEnum } from 'types/enums';

import s from './Button.module.css';

export interface IButtonPropsType {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  type?: ElementTypeEnum;
  disabled?: boolean;
}

const Button = (props: IButtonPropsType) => {
  const { onClick, children, className, disabled = false, type = ElementTypeEnum.default } = props;

  return (
    <button
      disabled={disabled}
      className={cn(s.button, `${type}-wrapper`, className)}
      onClick={() => {
        sounds.blob();
        onClick();
      }}
    >
      {children}
    </button>
  );
};

export default Button;
