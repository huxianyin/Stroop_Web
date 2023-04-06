
import "../css/Stroop.css"
import { useState, useEffect } from "react";


function Stroop(props) {
    const rentation_mark = {"word":"+","color":"white"}
    
    const [stimulus, setStimulus] = useState({"word":"_","color":"white"});
    const [startTime, setStartTime] = useState(-1);
    const [finished, setFinished] = useState(false);

    const [data, setData] = useState([]);

    useEffect(() => {
        GenerateStimuliArray();
    }, [startTime])

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
        console.log("shuffled!!!");
        shuffle(stimuli_array);
    }
    //add rest block
    insert_rest_locs.forEach(trial=>{
      stimuli_array.insert(trial.idx,{"word":trial.text,"color":"white","dur":trial.dur*1000});
    })
    setData(stimuli_array);
  }



  const GenerateNeutralStimuli = (n,type,dur,ri)=>{
    const aug_preset = getAugmentedPreset(n);
    shuffle(aug_preset);
    var res = []
    aug_preset.map((pair)=>{
      if(type=="word-only"){
        res.push({"word":pair.word,"color":"#ffffff","dur":dur,"ri":ri});
      }
      else if(type=="color-only"){
        res.push({"word":"■","color":pair.color,"dur":dur,"ri":ri});
      }
    })
    return res;
  }

  const GenerateCongruentStimuli = (n,dur,ri)=>{
    var res = [];
    getAugmentedPreset(n).map((pair)=>{
      res.push({"word":pair.word,"color":pair.color,"dur":dur,"ri":ri});
    });
    return res;
  }

  const GenerateIncongruentStimuli = (n,dur,ri) => {
    var res = [];
    getAugmentedPreset(n).map((pair)=>{
      const color = pick_other_color(pair.word);
      res.push({"word":pair.word,"color":color,"dur":dur,"ri":ri});
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
        setStimulus(trial);
        await sleep(stimuli_present_duration);

        setStimulus(rentation_mark);
        await sleep(rentention_interval);
    }
    setFinished(true);
    }


    const render_func = () => {
        if(startTime<0){
            return <button className="BigBtn" onClick={()=>{
                setStartTime(Date.now());
                PresentStimulus();
            }}>Start</button>
        }
        else if(!finished){
            return <span style={{color:stimulus.color}}>{stimulus.word}</span>
        }
        else{
            return <button className="BigBtn" onClick={props.onFinished}>Finished</button>
        }

    }

    return (
        <div className="StroopPage">
            {render_func()}
        </div>
    );
}

export default Stroop;