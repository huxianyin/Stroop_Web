import './App.css';
import logo from './resources/stroop.png' 
import Preset from './components/Preset';
import BasicBlocks from './components/BasicBlocks';
import CompoundedBlocks from './components/CompoundedBlocks';
import { Button } from '@mui/material';
import { useState } from 'react';
import Stroop from './components/Stroop';

function App() {

  const [started, setStarted] = useState(false);
  const [taskData, setTaskData] = useState([]);
  const [preset, setPreset] = useState([]);

  return (
    <div class="App">
      {!started?
      <div>
        <header class="App-header">
          <img src={logo} alt="Logo"/>
          <h1>Customizable Stroop Task</h1>
          <img src={logo} alt="Logo"/>
        </header>

        <div class='body'>
          <Preset></Preset>
          <BasicBlocks></BasicBlocks>
          <CompoundedBlocks></CompoundedBlocks>
          <Button onClick= {()=>{setStarted(true)}}>Start</Button>
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
