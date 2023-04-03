
import "../css/Stroop.css"
import { useState, useEffect } from "react";


function Stroop(props) {
    const update_rate = 500.0; //50ms = 0.05s
    const rentation_mark = {"word":"+","color":"white"}

    const stimuli_present_duration = 2 * 1000;
    const rentention_interval = 1 *1000;
    
    const [presentInfo, setPresentInfo] = useState({"nth":0,"is_retention":false});
    const [startTime, setStartTime] = useState(Date.now());

   
    const data = [
        {"word":"red","color":"#ff0000"},
        {"word":"blue","color":"#00ff00"},
        {"word":"green","color":"#0000ff"},
    ];

    const refreshUI = () =>{
        const t = Date.now() - startTime;
        const dur = stimuli_present_duration + rentention_interval;
        const relative_now = t - presentInfo.nth*dur;
    
        
        if(relative_now > dur){
            if(presentInfo.nth==data.length-1){
                props.onFinished();
            }
            else{
                setPresentInfo({"nth":presentInfo.nth+1, "is_retention":false});
            }
        }
        else if(relative_now > stimuli_present_duration){
            setPresentInfo({"nth":presentInfo.nth, "is_retention":true});
        }

    }

    useEffect(() => {
        const timerId = setInterval(refreshUI, update_rate);//call every 1 second from start
        return function cleanup() {
            clearInterval(timerId);
          };
      }, [presentInfo]);


    return (
        <div className="StroopPage">
            {presentInfo.is_retention? <span style={{color:rentation_mark.color}}>{rentation_mark.word}</span>
            :<span style={{color:data[presentInfo.nth].color}}>{data[presentInfo.nth].word}</span>}
        </div>
    );
}

export default Stroop;