import { Button } from "@mui/material"
import "../css/Block.css"
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {TextField,Checkbox} from '@mui/material';

import { useState } from "react";

function CompoundBlock(props) {
    const [n_congruent, setN_congruent] = useState(10);
    const [n_incongruent, setN_incongruent] = useState(10);
    const [n_word_only, setN_word_only] = useState(10);
    const [n_color_only, setN_color_only] = useState(10);
    const [duration, setDuration] = useState(2000);
    const [retentionInterval, setRententionInterval] = useState(1000);


    return (
        <div className="CompoundBlock">
            <h2>{props.data.title}</h2>

            <div className="gridContainer">
            <TextField className="input"
                id="outlined-controlled"
                label="Num of congruent trials"
                value={n_congruent}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setN_congruent(event.target.value);
                }}
                />
            <TextField className="input"
                id="outlined-controlled"
                label="Num of incongruent trials"
                value={n_incongruent}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setN_congruent(event.target.value);
                }}
                />
            <TextField className="input"
                id="outlined-controlled"
                label="Num of word-only trials"
                value={n_word_only}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setN_congruent(event.target.value);
                }}
                />
            <TextField className="input"
                id="outlined-controlled"
                label="Num of color-only trials"
                value={n_color_only}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setN_congruent(event.target.value);
                }}
                InputLabelProps={{ shrink: true }}
                />


            <TextField className="input"
                id="outlined-controlled"
                label="Presentation Duration (ms)"
                value={duration}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setDuration(event.target.value);
                }}
                InputLabelProps={{ shrink: true }}
                />

            <TextField className="input"
                id="outlined-controlled"
                label="Rentention Interval (ms)"
                value={retentionInterval}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setRententionInterval(event.target.value);
                }}
                InputLabelProps={{ shrink: true }}
                />
            </div>
        </div>
    );

}


export default CompoundBlock;