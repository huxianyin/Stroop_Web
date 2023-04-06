import './App.css';
import logo from './resources/stroop.png' 
import Preset from './components/Preset';
import BasicBlocks from './components/BasicBlocks';
import CompoundedBlocks from './components/CompoundedBlocks';
import { Button, TextField } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { useState } from 'react';
import Stroop from './components/Stroop';

Array.prototype.insert = function ( index, ...items ) {
  this.splice( index, 0, ...items );
};

function App() {
  const initPreset = [
    {word:"red", color:"#ff0000"},
    {word:"green", color:"#00ff00"},
    {word:"blue", color:"#0000ff"}
  ]

  const [started, setStarted] = useState(false);
  const [taskData, setTaskData] = useState([]);
  const [stimuliData, setStimuliData] = useState([]);
  const [shuffleAcorssTT, setShuffleAcrossTT] = useState(false);

  const [preset, setPreset] = useState(initPreset);
  const [trialIdx, setTrailIdx] = useState(-1);
  //for change detial of a setting
  const [nth,setNth] = useState(0);
  const [ri, setRI] = useState(0);
  const [dur,setDur] = useState(0);
  const [restText, setRestText] = useState("");
  const [restDur, setRestDur] = useState("");
 

  //for setting window
  const [open, setOpen] = useState(false);
  const handleClickSetting = (idx) => {
    setTrailIdx(idx);
    setOpen(true);

    if(taskData[idx]["type"]==="rest"){
      setRestText(taskData[idx]["text"]);
      setRestDur(taskData[idx]["duration"]);
    }
    else{
      setNth(taskData[idx]["n"]);
      setDur(taskData[idx]["duration"])
      setRI(taskData[idx]["retention_interval"]);
    }
    
    
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () =>{
    const type = taskData[trialIdx]["type"];
    let data = [...taskData];
    // 2. Make a shallow copy of the item you want to mutate
    let trial = {...data[trialIdx]};

    if(type==="rest"){
      trial["duration"] = parseInt(restDur);
      trial["text"] = restText; 
    }
    else{
      trial["n"] = parseInt(nth);
      trial["duration"] = parseInt(dur);
      trial["retention_interval"] = parseInt(ri);
    }
    
    data[trialIdx] = trial;    
    setTaskData(data);
    setOpen(false);
    
  }

  const print_data = (data) => {
    var show_string = "";
    data.forEach((item)=>{
      show_string = show_string + JSON.stringify(item) + "\n";
    })
    return show_string;
  }
  

  const rest_dialog_content = () =>{
    return (
      <div>
        <TextField
          required
          autoFocus
          margin="dense"
          type="number"
          fullWidth
          variant="standard"
          label="Rest Duration (s)"
          defaultValue={restDur}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setRestDur(event.target.value);
            }}
      />
      <TextField
          required
          autoFocus
          margin="dense"
          type="text"
          fullWidth
          variant="standard"
          label="Rest Text"
          defaultValue={restText}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setRestText(event.target.value);
            }}
      />
      </div>

    )
  }

  const trail_dialog_content = () =>{
    return (
      <div>
         <TextField
          required
          autoFocus
          margin="dense"
          type="number"
          fullWidth
          variant="standard"
          label="N"
          defaultValue={nth}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setNth(event.target.value);
            }}
      />
      <TextField
          required
          autoFocus
          margin="dense"
          type="number"
          fullWidth
          variant="standard"
          label="Present Duration (ms)"
          defaultValue={dur}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setDur(event.target.value);
            }}
      />
      <TextField
          required
          autoFocus
          margin="dense"
          type="number"
          fullWidth
          variant="standard"
          label="Rentention Interval (ms)"
          defaultValue={ri}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setRI(event.target.value);
            }}
      />
       
      </div>

    )
  }


//for manipulate task data
  const onRemovePair = (element)=>{
    setPreset(preset.filter(item => (item.word !== element.word) || (item.color !== element.color) ));
  }

  const onAddPair = (word,color) =>{
    setPreset(preset => [...preset, {word:word,color:color}])
  }

  const onAddTrials = (trail_data) => {
    setTaskData(taskData => [...taskData, trail_data])
  }

  const flow_block = (data,idx) =>{
    const class_var = 'flowBlock'+' '+data.type;

    return <div className={class_var} key={idx}>
      <div className='info'>
          <span>{data.type}</span>
          
          {data.type!=="rest"?<span> x {data.n}</span>:<span> for {data.duration}s</span>}
      </div>
      <div className="detail">
        {data.type!=="rest"?　<span>{data.duration/1000}s,{data.retention_interval/1000}s</span>
        :<span>{data.text}</span>}
      </div>
      <Button onClick={()=>handleClickSetting(idx)}>Setting</Button>
    </div>
  }

  const onStart = () => {

    if(taskData.length>0){
      setStarted(true)
    }
    else {
      alert("No designed task data");
    }
    
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
            <Preset onAddPair={onAddPair} onRemovePair={onRemovePair} data={preset}></Preset>
            <BasicBlocks onAddTrials={onAddTrials}></BasicBlocks>
            <CompoundedBlocks onAddTrials={onAddTrials}></CompoundedBlocks>
          </div>

          <div className='right'>
            <h1>Designed Task</h1>
            <div className='Inputs'>
            <span className='label'>Shuffle Across Trial Type</span>
              <Checkbox
                onClick={() => {
                setShuffleAcrossTT(!shuffleAcorssTT);
              }}/> 
                  
              <Button variant='outlined' onClick={()=>{setTaskData([])}}> Clear </Button>
            </div>
            <Button variant="contained" className="StartBtn" onClick= {onStart}>Go To Task</Button>
            {/* <Button variant="outlined" className="StartBtn" onClick= {()=>{alert(print_data(taskData));}}>Check Task Data</Button>
            <Button variant="outlined" className="StartBtn" onClick= {()=>{alert(print_data(preset))}}>Check Preset Data</Button> */}
            
            <div className='DesignedTask'>
                {taskData.map((item,idx)=>{return flow_block(item,idx)})}
                {taskData.length>1 ? <div className='finishBlock'><span>finish</span></div> : <div></div>}
              </div>
          </div>
          
          {trialIdx>=0 && taskData.length>0?
          <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Set the detail of this trial block</DialogTitle>

                <DialogContent>
                  {taskData[trialIdx]["type"]=="rest"?rest_dialog_content():trail_dialog_content()}
                </DialogContent> 

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
          </Dialog> :
          <div></div>
          }

        </div>
        <footer>
          <span>developed by <a href='http://www.lhei.k.u-tokyo.ac.jp/'>Heilab</a></span>
        </footer>
      </div> :<Stroop onFinished={()=>{setStarted(false);}} taskData={taskData} preset={preset} shuffleAcorssTT={shuffleAcorssTT}/>
      }
    </div>
  );
}

export default App;
