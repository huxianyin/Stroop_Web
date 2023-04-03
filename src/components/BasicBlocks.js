import Block from "./Block";


function BasicBlocks() {
    const data = [
        {title:"Congruent",type:"congruent"},
        {title:"Incongruent",type:"incongruent"},
        {title:"Word-only",type:"word-only"},
        {title:"Color-only",type:"color-only"},
        {title:"休憩",type:"rest"},
    ];


    return (
        <div>
            <h1>Basic Blocks</h1>
            <div style={{display:"flex", flexWrap:"wrap"}}>
                {
                    data.map((item)=>{
                        return <Block
                        title={item.title}
                        type={item.type}
                        ></Block>
                    })
                }
                

            </div>

        </div>
    );
}

export default BasicBlocks;