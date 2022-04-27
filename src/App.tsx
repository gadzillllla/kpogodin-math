import Exercise from 'components/Exercise';
import { useState } from 'react';

import s from './App.module.css';

function App() {
  const [step, setStep] = useState(1);
  // const [step, setStep] = useState(1);

  return (
    <div className={s.root}>
      <Exercise onNext={() => setStep(step + 1)} step={step} />
    </div>
  );
}

export default App;
