import React from "react";
import Chart from 'react-apexcharts';

const trial_type_indices={
    "incongruent":0,
    "color-only":1,
    "word-only":2,
    "congruent":3
}

const options = {
    chart: {
      type: 'boxPlot',
      height: 350
    },
    title: {
      text: 'Reaction Time in millisecond of each trial type',
      align: 'center'
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '50%'
      },
      boxPlot: {
        colors: {
          upper: '#e9ecef',
          lower: '#f8f9fa'
        }
      }
    },
    stroke: {
      colors: ['#6c757d']
    }
  };

let init_data = {
    data: [
      {
        x: 'incongruent',
        y: []
      },
      {
        x: 'color-only',
        y: []
      },
      {
        x: 'word-only',
        y: []
      },
      {
        x: 'congruent',
        y: []
      },
    ]
  }


function BoxChart (props) {
    const generate_chart_data = () => {
        var res = init_data;
        if(props.data){
            props.data.map((item)=>{
                res.data[trial_type_indices[item["stimulus"]["trial_type"]]]["y"].push(item["rt"]/1000);
            });
        }
       return [res];
    }

    return (
    <div id="chart">
        <Chart options={options} series={generate_chart_data()} type="boxPlot" height={400}/>
    </div>
    );
    
  }

  export default BoxChart;