import React, { FC, useRef, useContext, useEffect, useCallback, useState } from 'react';
import styles from './BarGraph.module.scss';
import { Bar, Line } from 'react-chartjs-2';
import { BatteryInterface } from '../../Interfaces';
import  { Chart, BarController, BarElement, CategoryScale, Tooltip, Legend, LinearScale, LineController, LineElement, PointElement}  from 'chart.js'
import { WindowContext } from '../context/WindowContextProvider';


interface GraphsProps {
  data : BatteryInterface['measurements'],
  className_ :any
}

const Graphs: FC<GraphsProps> = (props : GraphsProps) => {
  Chart.register(
    BarController, BarElement, CategoryScale, Tooltip, Legend, LinearScale,
    LineController, LineElement, PointElement
    );
  const divRef = useRef(null);
  const wContext = useContext(WindowContext);
  const screenRef = useRef(wContext.windowWidth);
  const screenDefaults = { phoneMax : 600, tabletMax: 820}
  const [screenSize, setScreenSize] = useState<string>();
  const [measurements, setMeasurements] = useState<BatteryInterface['measurements']>(props.data);
 
  /** Calculate data measurements as averges when user screen size reduces */
  const filterData = (screenSize_ : string)=> {
    let perChunk : number;; // items per chunk  
    let tempSOC : number;
    let dataChunks : BatteryInterface['measurements'];
  
    switch(screenSize_) {
      case 'phone' : 
      perChunk = 5;
      dataChunks = props.data.reduce((initArray : BatteryInterface['measurements'], item, index) => {
        if(index % perChunk === 0) {
          tempSOC = props.data.slice(index, index + perChunk).reduce((previous, current) => ((current.stateOfCharge as number + previous)), 0) / perChunk;
          initArray.push({ timestamp: props.data[index].timestamp, stateOfCharge: tempSOC })
        }
        return initArray
        }, []); 
        setMeasurements(dataChunks);
        break;
      case 'tablet' : 
      perChunk = 2;
      dataChunks = props.data.reduce((initArray : BatteryInterface['measurements'], item, index) => {
        if(index % perChunk === 0) {
          tempSOC = props.data.slice(index, index + perChunk).reduce((previous, current) => ((current.stateOfCharge as number + previous)), 0) / perChunk;
          initArray.push({ timestamp: props.data[index].timestamp, stateOfCharge: tempSOC })
        }
        return initArray
        }, []); 
        setMeasurements(dataChunks);
        break;
      case 'computer' : 
        setMeasurements(props.data); break;
    }

  }

  /** Set screen size and filter data accordingly */
  useEffect(() => {
      if (screenSize != 'phone' && wContext.windowWidth < screenDefaults.phoneMax) {
      setScreenSize('phone');
      filterData('phone');
      }
      if (screenSize != 'tablet' && (wContext.windowWidth > screenDefaults.phoneMax && wContext.windowWidth < screenDefaults.tabletMax)) {
      console.log('tablet');
      setScreenSize('tablet');
      filterData('tablet');
      }
      if (screenSize != 'computer' && wContext.windowWidth > screenDefaults.tabletMax) {
      setScreenSize('computer');
      filterData('computer');
      }

  }, [wContext])

  return (
  
  <div className={styles.BarGraph} ref={divRef}>
    <Line  
    datasetIdKey={""} 
    data={{
      labels : measurements.map(item => new Date(item.timestamp).toLocaleString()),
      datasets : [{
        label : 'State of charge',
        data : measurements.map(item => item.stateOfCharge),
        backgroundColor : props.data.map(item => 'rgb(' + (100 - (item.stateOfCharge as number)) +','+ (100 + (item.stateOfCharge as number)) + ',50)')
      }],
      
    }}
    options={{ 
      spanGaps: true,
      aspectRatio: 4,
      maintainAspectRatio: false,
      scales : {
        x : {
          max: 200,
          min: 10,
          ticks : {
            maxTicksLimit: Math.round(measurements.length / 50),
            maxRotation: 0,
            align: 'start',
            
          }  
        },
        y : {
          ticks : { 
            align : 'inner'
           }
        }
      }
    }}
     >
    </Line>
  </div>
  )
};

export default Graphs;
