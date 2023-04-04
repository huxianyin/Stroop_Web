import CompoundBlock from "./CompoundBlock";

function CompoundedBlocks(props) {
    return (
        <div>
            <h1>Compounded Blocks</h1>

            <div>
                <CompoundBlock title={"standard"} onAddTrials={props.onAddTrials}></CompoundBlock>
            </div>
        </div>
    );
}

export default CompoundedBlocks;