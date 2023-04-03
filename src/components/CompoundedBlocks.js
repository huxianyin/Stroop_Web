import CompoundBlock from "./CompoundBlock";

function CompoundedBlocks(props) {
    const default_trail_duration = 2;
    const default_retention_interval = 1;
    const default_n=10;

    const default_shuffle_across_trial_type = false;
    const default_present_style_within_trial_type = "random" // inclusive-order" , "inclusive-shuffle"
    const data=[
        {title:"standard","n_congruent":10,"n_incongruent":10,"n_word-only":10,"n_color-only":10,"presentation_duration":2000,"retention_interval":1000}
    ]

    return (
        <div>
            <h1>Compounded Blocks</h1>

            <div>
                <CompoundBlock data={data[0]}></CompoundBlock>
            </div>
        </div>
    );
}

export default CompoundedBlocks;