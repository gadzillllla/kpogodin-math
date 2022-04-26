import React from 'react';

import s from './MathSymbol.module.css';

export interface IMathSymbolPropsType {}

function MathSymbol() {
  return <div className={s.root}>MathSymbol component</div>;
}

export default MathSymbol;
