import React, { useState } from 'react';
import "../css/Preset.css"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MuiColorInput } from 'mui-color-input'

function PresetElement(props){
    const bg = { 'backgroundColor': props.color }
    return (
        <div class='PresetElement' >
            <button onClick={props.onRemove}>x</button>
            <span>{props.word}:</span>
            <div style={bg}></div>
        </div>
    );
}

function Preset() {
    const [color, setColor] = React.useState('#ffffff')
    const [word, setWord] = React.useState('white')
    const [data, setData] = useState([
        {word:"red", color:"#ff0000"},
        {word:"green", color:"#00ff00"},
        {word:"blue", color:"#0000ff"}
    ]);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    const AddToPreset =() =>{
        setData(data => [...data, {word:word,color:color}])
        setOpen(false);
    }

    const RemoveFromPreset = (element)=>{
        setData(data.filter(item => (item.word !== element.word) || (item.color !== element.color) ));
    }

    const handleColorChange = (color) => {
        setColor(color)
      }


    return (
        <div class='Preset'>
            <h1>Color-Word Pairs Preset</h1>
            <div class='PairContainer'>
                {data.map(e => {
                    
                    return <PresetElement onRemove={()=>RemoveFromPreset(e)} 
                    key={e.word+"-"+e.color} 
                    color={e.color}
                     word={e.word}>

                    </PresetElement>
                })
                }
                <Button ovariant="contained" onClick={handleClickOpen}>add</Button>
                
                <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add To Preset</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add a color-word or image-word pair to preset
                    </DialogContentText>
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="name"
                            label="word"
                            defaultValue={word}
                            fullWidth
                            variant="standard"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setWord(event.target.value);
                              }}
                        />
                        <MuiColorInput value={color} onChange={handleColorChange} />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={AddToPreset}>Add</Button>
                    </DialogActions>
            </Dialog>

            </div>
            
        </div>
    )

}

export default Preset;