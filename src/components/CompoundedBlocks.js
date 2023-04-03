
import "../css/Trail.css"

function CompoundedBlocks(props) {
    const default_trail_duration = 2;
    const default_retention_interval = 1;
    const default_n=10;

    const default_shuffle_across_trial_type = false;
    const default_present_style_within_trial_type = "random" // inclusive-order" , "inclusive-shuffle"
    const data=[
        {title:"一致","type":"congurent","n":default_n,"present_style":default_present_style_within_trial_type},
        {title:"不一致","type":"incongurent","n":default_n,"present_style":default_present_style_within_trial_type},
        {title:"CO","type":"color-only","n":default_n,"present_style":default_present_style_within_trial_type},
        {title:"WO","type":"word-only","n":default_n,"present_style":default_present_style_within_trial_type},
    ]

    return (
        <div>
            <h1>Compounded Blocks</h1>

            <div>

            </div>
        </div>
    );
}

export default CompoundedBlocks;