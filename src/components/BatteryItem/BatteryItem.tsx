import React, { FC, useState, useRef, useEffect, useContext } from 'react';
import { BatteryInterface } from '../../Interfaces';
import styles from './BatteryItem.module.scss';
import  { WindowContext } from '../context/WindowContextProvider';
import Graphs from '../Graphs/BarGraph';
import { PageContext } from '../MainPage/MainPage';

interface BatteryItemProps {
  batteryItemProp : BatteryInterface;
}



const BatteryItem: FC<BatteryItemProps> = (props : BatteryItemProps) => {
  
  const windowContext = useContext(WindowContext);
  const { page, setPage } = useContext(PageContext);
  
  const goBack = () => { 
    setPage([page[1], 2])
  };

  useEffect(() => {
    
  })

  return (
    <div id={styles.batteryItemContainer}>
      <div id={styles.exitBtnContainer}><button id={styles.exitBtn} onClick={goBack} style={{background: 'url(/images/closeBtnGroup.svg)'}}/></div>
      <div className={styles.BatteryItem}>
            <div 
              className={styles.gridItem} id={styles.id}>
              Id: {props.batteryItemProp.id}
            </div>
            <Graphs 
              className_={styles.gridItem} 
              data={props.batteryItemProp.measurements}/>
            <div 
              className={styles.gridItem} 
              id={styles.location}>
                <span>
                  Location:
                  {!!props.batteryItemProp.location ? props.batteryItemProp.location : 'N/A'}
                </span>
                <img src="/images/location.svg" alt="" />
            </div>
            <div 
              className={styles.gridItem} 
              id={styles.capacity}>
                <span>Capacity: {props.batteryItemProp.capacity}</span>
                <img src="/images/capacity.svg" alt="" />
            </div>
            <div 
              className={styles.gridItem} 
              id={styles.voltage}>
                <span>
                  Voltage:
                  {props.batteryItemProp.voltage}
                </span>
                <img src="/images/voltage.svg" alt="" />
            </div>
            <div 
              className={styles.gridItem} 
              id={styles.connectionStatus}>
                <span>
                  Connection status: {
                  props.batteryItemProp.connectionStatus === 0 ? 'Deep discharge'
                  : props.batteryItemProp.connectionStatus === 1 ? 'Overheating'
                  : props.batteryItemProp.connectionStatus === 2 ? 'Unknown anomaly'
                  : 'Missing data'
                  }
                </span>
                <img src="/images/connectionStatus.svg" alt="" />
            </div>
            <div 
              className={styles.gridItem} 
              id={styles.lastConnectionTime}>
                <span>
                  Last connection time:
                  {new Date(props.batteryItemProp.lastConnectionTime).toLocaleString()}
                </span>
                <img src="/images/lastConnectionTime.svg" alt="" />
            </div>
            <div 
              className={styles.gridItem} 
              id={styles.stateOfCharge}>
                <span>
                  Last state of charge:
                  {!!props.batteryItemProp.stateOfCharge ? props.batteryItemProp.stateOfCharge : 'N/A'}
                </span>
                <img src="/images/stateOfCharge.svg" alt="" />
            </div>
            <div 
              className={styles.gridItem} 
              id={styles.stateOfHealth}>
                <span>
                  State of health:
                  {!!props.batteryItemProp.stateOfHealth ? props.batteryItemProp.stateOfHealth : 'N/A'}
                </span>
                <img src="/images/stateOfHealth.svg" alt="" />
            </div>
      </div>
      
    </div> 

  )
};

export default BatteryItem;
