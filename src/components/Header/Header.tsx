import React from 'react';

import s from './Header.module.css';

export interface IHeaderPropsType {
  title: string;
}

const Header = (props: IHeaderPropsType) => {
  const { title } = props;
  return (
    <header className={s.header}>
      <h1 className={s.title}>{title}</h1>
    </header>
  );
};

export default Header;
