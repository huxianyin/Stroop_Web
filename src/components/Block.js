import "../css/Block.css"

import { Button } from "@mui/material"




function Block(props) {
    const default_retention_interval = 1000; //ms
    const default_present_duration = 2*1000; //ms
    const default_n = 10; 
    const default_rest_dur = 30; //s 
    const default_rest_text = "休憩してください";

    const logo = ()=>{
        if(props.type=="congruent"){
            return <h2 style={{color:"red"}}>Red</h2>
        }
        else if(props.type=="incongruent"){
            return <h2 style={{color:"blue"}}>Red</h2>
        }
        else if(props.type=="word-only"){
            return <h2 style={{color:"black"}}>Red</h2>
        }
        else if(props.type=="color-only"){
            return <h2 style={{color:"red"}}>■</h2>
        }
        else if(props.type=="rest"){
            return <h2　style={{color:"grey"}}>Rest</h2>
        }
        else{
            return <h2></h2>
        }
    }

    const onAdd = () => {
        var trial_data = {"type":props.type};
        if(props.type == "rest"){
            trial_data["duration"] = default_rest_dur;
            trial_data["text"] = default_rest_text;
        }
        else{
            trial_data["n"] = default_n;
            trial_data["retention_interval"] = default_retention_interval;
            trial_data["duration"] = default_present_duration;
        }
        props.onAddTrials(trial_data);
    }

    return (
        <div className="BasicBlock">
            <p>{props.title}</p>
            {logo()}
            <div class="ButtonContainer">
            <Button className="AddBtn" onClick={onAdd}>+</Button>
            </div>
        </div>
    );

}


export default Block;