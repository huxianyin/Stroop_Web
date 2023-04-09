
import "../css/Stroop.css"
import "../css/btns.css"
import { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import BoxChart from "./BoxChart";


function Stroop(props) {
    const rentation_mark = {"word":"+","color":"#000000","opts":[]}

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();
    
    const [stimulus, setStimulus] = useState({"word":"_","color":"white","opts":[]});
    const [started, setStarted] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [finished, setFinished] = useState(false);
    const [response, setResponse] = useState('');
    const [resData, setResData] = useState([]);

    const [data, setData] = useState([]);

    useEffect(() => {
        GenerateStimuliArray();
    }, [])


  const GenerateStimuliArray = ()=>{
    if(props.taskData.length==0) return;
    let stimuli_array = [];
    let insert_rest_locs = [];
    var idx = 0;
    props.taskData.forEach(trial => {
      if(trial.type!=="rest"){
        if(trial.type==="word-only" || trial.type=="color-only"){
          let stimuli = GenerateNeutralStimuli(trial.n,trial.type, trial.duration, trial.retention_interval);
          stimuli_array = stimuli_array.concat(stimuli);
        }
        else if(trial.type=="congruent"){
          let stimuli = GenerateCongruentStimuli(trial.n, trial.duration, trial.retention_interval);
          stimuli_array = stimuli_array.concat(stimuli);
        }
        else if(trial.type=="incongruent"){
          let stimuli = GenerateIncongruentStimuli(trial.n, trial.duration, trial.retention_interval);
          stimuli_array = stimuli_array.concat(stimuli);
        }
        idx += trial.n;
      }
      else{
        insert_rest_locs.push({"idx":idx,"text":trial.text,"dur":trial.duration});
        idx+=1;
      }
    });
    if(props.shuffleAcorssTT){
        //console.log("shuffled!!!");
        shuffle(stimuli_array);
    }
    //add rest block
    insert_rest_locs.forEach(trial=>{
      stimuli_array.insert(trial.idx,{"word":trial.text,"color":"#000000","dur":trial.dur*1000});
    })
    setData(stimuli_array);

  }


  const GenerateNeutralStimuli = (n,type,dur,ri)=>{
    const aug_preset = getAugmentedPreset(n);
    shuffle(aug_preset);
    var res = [];
    aug_preset.map((pair)=>{
      if(type=="word-only"){
        //const opts = getRandomSubset(pair.word,"#ffffff").map((item)=>item.word);
        res.push({"word":pair.word,"color":"#000000","dur":dur,"ri":ri,"trial_type":type});

        
      }
      else if(type=="color-only"){
        //const opts = getRandomSubset("■",pair.color).map((item)=>item.word);
        res.push({"word":"■","color":pair.color,"dur":dur,"ri":ri,"trial_type":type});
      }
    })
    return res;
  }

  const GenerateCongruentStimuli = (n,dur,ri)=>{
    var res = [];
    getAugmentedPreset(n).map((pair)=>{
      //const opts = getRandomSubset(pair.word,pair.color).map((item)=>item.word);
      res.push({"word":pair.word,"color":pair.color,"dur":dur,"ri":ri,"trial_type":"congruent"});
    });
    return res;
  }

  const GenerateIncongruentStimuli = (n,dur,ri) => {
    var res = [];
    getAugmentedPreset(n).map((pair)=>{
      const color = pick_other_color(pair.word);
      //const opts = getRandomSubset(pair.word,color).map((item)=> item.word);
      res.push({"word":pair.word,"color":color,"dur":dur,"ri":ri,"trial_type":"incongruent"});
    });
    return res;
  }

  const pick_other_color = (word) => {
    let tmpset = props.preset.slice();
    tmpset = tmpset.filter(item => item.word!=word);
    var rand = tmpset[Math.floor(Math.random()*tmpset.length)];
    return rand.color;
  }

  const getAugmentedPreset = (n) => {
    const num = Math.ceil( n/ props.preset.length);
    var res = [];
    for(var i=0;i<num;i++){
      res = res.concat(props.preset);
    }
    return res.slice(0,n);
  }

  const shuffle = (array)=> {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
  
  const PresentStimulus = async () => {
    for(var i=0;i<data.length;i++){
        let trial = data[i];
        const stimuli_present_duration = trial.dur;
        var rentention_interval = 0;
        if("ri" in trial) rentention_interval = trial.ri;
        if(props.modality=="speech") 
        {
          SpeechRecognition.startListening();
        }
        setStartTime(Date.now());
        setStimulus(trial);
        await sleep(stimuli_present_duration);

        if(props.modality=="speech") {
          SpeechRecognition.stopListening()
          resetTranscript();
        }
        setResponse('');
        
        setStimulus(rentation_mark);
        setStartTime(0);
        

        await sleep(rentention_interval);
    }
    setFinished(true);
    }
  
  const onRespond = (res) => {
    setResponse(res);
    setResData(current => [...current, {"stimulus":stimulus,"rt":Date.now() - startTime}]);
  }

  const handleSaveData = ()=>{
    //TODO : save resData to csv file
  }

  const render_func = () => {
        if(!started){
            return <button className="BigBtn" onClick={()=>{
                setStarted(true);
                PresentStimulus();
            }}>Start</button>
        }
        else if(!finished){
            if (!browserSupportsSpeechRecognition) {
                return (<div>
                        <span>Browser doesn't support speech recognition.</span>;
                        <button className="BigBtn" onClick={props.onFinished}>Finished</button>
                    </div>)
            }
            return (
            <div>
                <span className="stimuli" style={{color:stimulus.color}}>{stimulus.word}</span>
                {props.modality==="motor"? 
                  <div className="Options">
                    {props.options.split(',').map((item,idx) => {
                      return (<div className="option">
                        {/* <span key={idx}>{item}</span> */}
                        <button className="btn03 pushright"
                        onClick={()=>{onRespond(item)}}
                        ><span>{item}</span></button>
                      </div>);
                    }) }
                  </div> :  <div></div>
                }
                <span className="transcript">{props.modality==="speech"?transcript:response}</span>
            </div>);
        }
        else{
            return <div>
              <div className="ChartContainer"><BoxChart data={resData}></BoxChart></div>
              <button className="MidBtn" onClick={handleSaveData}>Download Data</button>
              <button className="MidBtn" onClick={props.onFinished}>Back To Home</button>
              </div>
        }

    }

    return (
        <div className="StroopPage">
            {render_func()}
        </div>
    );
}

export default Stroop;