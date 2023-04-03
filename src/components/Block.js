import "../css/Block.css"

import { Button } from "@mui/material"


function Block(props) {

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


    return (
        <div className="BasicBlock">
            <p>{props.title}</p>
            {logo()}
            <div class="ButtonContainer">
            <Button className="AddBtn">+</Button>
            </div>
        </div>
    );

}


export default Block;