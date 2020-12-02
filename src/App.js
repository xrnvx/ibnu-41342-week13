import React, {useState} from 'react';
import DisplayComponent from './Components/DisplayComponent';
import BtnComponent from './Components/BtnComponent';
import './App.css';

function App() {
  const [time, setTime] = useState({ms:0, s:0, m:0, h:1});
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);
  // Not started = 0
  // started = 1
  // stopped = 2

  const start = () => {
    run();
    setStatus(1);
    setInterv(setInterval(run, 10));
  };

  var updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h;

  const run = () => {
    if(updatedH > 0){
      updatedH--;
      updatedM = 59;
    }
    if(updatedM > 0){
      updatedS--;
      updatedM = 69;
    }
    if(updatedMs === 0){
      updatedS--;
      updatedMs = 100;
    }
    updatedMs--;
    return setTime({ms:updatedMs, s:updatedS, m:updatedM, h:updatedH});
  };

  const stop = () => {
    clearInterval(interv);
    setStatus(2);
  };

  const reset = () => {
    clearInterval(interv);
    setStatus(0);
    setTime({ms:0, s:0, m:0, h:0})
  };

  const resume = () => start();


  return (
    <div className="main-section">
      <div className="clock-holder">
          <div className="countdown">
          <h1>SIMPLE COUNTDOWN</h1>
              <DisplayComponent time={time}/>
              <BtnComponent status={status} resume={resume} reset={reset} stop={stop} start={start}/>
          </div>
      </div>
    </div>
  );
}

export default App;
