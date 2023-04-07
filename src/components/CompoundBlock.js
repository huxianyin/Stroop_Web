import { Button } from "@mui/material"
import "../css/Block.css"
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {TextField,Checkbox} from '@mui/material';

import { useState } from "react";

function CompoundBlock(props) {
    const default_retention_interval = 1000;
    const default_present_duration = 2*1000;
    const default_n = 10;

    const [n_congruent, setN_congruent] = useState(default_n);
    const [n_incongruent, setN_incongruent] = useState(default_n);
    const [n_word_only, setN_word_only] = useState(default_n);
    const [n_color_only, setN_color_only] = useState(default_n);
    const [duration, setDuration] = useState(default_present_duration);
    const [retentionInterval, setRententionInterval] = useState(default_retention_interval);

    const onAdd = ()=>{
        if(n_congruent > 0){
            props.onAddTrials({"type":"congruent","n":n_congruent, "duration":duration,"retention_interval":retentionInterval});
        }
        if(n_incongruent > 0){
            props.onAddTrials({"type":"incongruent","n":n_incongruent, "duration":duration,"retention_interval":retentionInterval});
        }
        if(n_word_only > 0){
            props.onAddTrials({"type":"word-only","n":n_word_only, "duration":duration,"retention_interval":retentionInterval});
        }
        if(n_color_only > 0){
            props.onAddTrials({"type":"color-only","n":n_color_only, "duration":duration,"retention_interval":retentionInterval});
        }
    }

    return (
        <div className="CompoundBlock">
            <h2>{props.title}</h2>

            <div className="gridContainer">
            <TextField className="input"
                id="outlined-controlled"
                label="Num of congruent trials"
                value={n_congruent}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setN_congruent(event.target.value);
                }}
                type="number"
                />
            <TextField className="input"
                id="outlined-controlled"
                label="Num of incongruent trials"
                value={n_incongruent}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setN_incongruent(event.target.value);
                }}
                type="number"
                />
            <TextField className="input"
                id="outlined-controlled"
                label="Num of word-only trials"
                value={n_word_only}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setN_word_only(event.target.value);
                }}
                type="number"
                />
            <TextField className="input"
                id="outlined-controlled"
                label="Num of color-only trials"
                value={n_color_only}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setN_color_only(event.target.value);
                }}
                InputLabelProps={{ shrink: true }}
                type="number"
                />


            <TextField className="input"
                id="outlined-controlled"
                label="Presentation Duration (ms)"
                value={duration}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setDuration(event.target.value);
                }}
                InputLabelProps={{ shrink: true }}
                type="number"
                />

            <TextField className="input"
                id="outlined-controlled"
                label="Rentention Interval (ms)"
                value={retentionInterval}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setRententionInterval(event.target.value);
                }}
                InputLabelProps={{ shrink: true }}
                type="number"
                />
            </div>

          
            <Button className="AddBtn" onClick={onAdd}>+</Button>
        </div>
    );

}


export default CompoundBlock;