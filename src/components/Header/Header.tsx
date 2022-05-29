import cn from 'classnames';
import React from 'react';
import { ElementTypeEnum } from 'types/enums';

import s from './Header.module.css';

export interface IHeaderPropsType {
  children: React.ReactNode;
  type?: ElementTypeEnum;
}

const Header = (props: IHeaderPropsType) => {
  const { children, type = ElementTypeEnum.default } = props;
  return <header className={cn(s.header, `${type}-wrapper`)}>{children}</header>;
};

export default Header;
