import './App.css';
import logo from './resources/stroop.png' 
import Preset from './components/Preset';
import BasicBlocks from './components/BasicBlocks';
import CompoundedBlocks from './components/CompoundedBlocks';
import { Button, TextField } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { useState } from 'react';
import Stroop from './components/Stroop';

function App() {
  const default_present_duration = 2000;
  const default_retention_interval = 1000;

  const initData = [
    {"type":"congruent", "n":10, "duration":default_present_duration, "retention_interval":default_retention_interval},
    {"type":"incongruent", "n":10,"duration":default_present_duration, "retention_interval":default_retention_interval},
    {"type":"word-only", "n":10,"duration":default_present_duration, "retention_interval":default_retention_interval},
    {"type":"read-only", "n":10,"duration":default_present_duration, "retention_interval":default_retention_interval},
    {"type":"rest", "dur":10,"text":"休憩してください"},
  ]

  const [started, setStarted] = useState(false);
  const [taskData, setTaskData] = useState(initData);
  const [preset, setPreset] = useState([]);

  const flow_block = (data,idx) =>{
    const class_var = 'flowBlock'+' '+data.type;

    return <div className={class_var} key={idx}>
      <div className='info'>
          <span>{data.type}</span>
          
          {data.type!=="rest"?<span> x {data.n}</span>:<span> for {data.dur} (sec)</span>}
      </div>
      <div className="detail">
        {data.type!=="rest"?　<span>{data.duration/1000}s,{data.retention_interval/1000}s</span>
        :<span>{data.text}</span>}
      </div>
      <Button>Setting</Button>
    </div>
  }

  return (
    <div>
      {!started?
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="Logo"/>
          <h1>Customizable Stroop Task</h1>
          <img src={logo} alt="Logo"/>
        </header>

        <div className='body'>
          <div className="left">
            <Preset></Preset>
            <BasicBlocks></BasicBlocks>
            <CompoundedBlocks></CompoundedBlocks>
          </div>

          <div className='right'>
            <h1>Designed Task</h1>
            <div className='Inputs'>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Shuffle Across Trial Types"/>
              <Button variant='outlined'> Clear </Button>
            </div>
            <Button variant="contained" className="StartBtn" onClick= {()=>{setStarted(true)}}>Start</Button>
            
            <div className='DesignedTask'>
                {taskData.map((item,idx)=>{return flow_block(item,idx)})}
                <div className='finishBlock'><span>finish</span></div>
              </div>
          </div>
          
        </div>
        <footer>
          <span>developed by <a href='http://www.lhei.k.u-tokyo.ac.jp/'>Heilab</a></span>
        </footer>
      </div> :<Stroop onFinished={()=>{setStarted(false);}}/>
      }
    </div>
  );
}

export default App;
