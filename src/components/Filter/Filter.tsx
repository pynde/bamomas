import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import styles from './Filter.module.scss';
import {BatteryInterface, FilterInterface} from '../../Interfaces'


interface FilterProps {
  batteryList : BatteryInterface[]
  setFilterProp : (id : string [], location : string[], connectionStatus : number[], stateOfCharge: number ) => void
}


const Filter: FC<FilterProps> = (props : FilterProps) => {

  const firstMountRef = useRef(true);
  const idRef = useRef(null);
  const locationRef = useRef(null);
  const chargeRef = useRef<HTMLInputElement>(null);
  const [selectedId, setSelectedId] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  const [selectedConnection, setSelectedConnection] = useState<number[]>([]);
  const [selectedCharge, setSelectedCharge] = useState<number>(100);
  const [formatedProps, setFormatedProps] = useState<FilterInterface>({ idFirstLetters : [], allLocations: [], connectionStatus: [], stateOfCharge: [] })



  /** Get value from properties for Filter component to use */
  const formatFilter = (listOfBatteries : BatteryInterface[]) => {
    // Get all id's first letters and form an array which consist only of unique values
    const idFirstLetters : string[] = listOfBatteries.map((item) => { return item.id.charAt(0) }).sort();
    const uniqueLetters : string[] = Array.from(new Set(idFirstLetters));
    // Array for locations which consist only of unique values
    const uniqueLocations : string[] = Array.from(new Set(listOfBatteries.map(item => item.location !== (undefined || null) ? item.location : 'NA' )));
    // Get state of charges and connection statuses; handle as -1 if null or undefined
    const charges = listOfBatteries.map(item => item.stateOfCharge !== (undefined || null) ? item.stateOfCharge : -1);
    const connectionStatusesTemp = listOfBatteries.map(item => item.connectionStatus != (undefined || null) ? item.connectionStatus : -1);
    const connectionStatuses = Array.from(new Set(connectionStatusesTemp));
    
    /** Format Filter component props for easier comparison */
    setFormatedProps({ 
        idFirstLetters : uniqueLetters,
        allLocations : uniqueLocations, 
        connectionStatus : connectionStatuses, 
        stateOfCharge : charges
      })
}
  /**  Check if ID's first letter is in the filter array. Set it to state if not. */
  const selectId = (firstLetter : string) => {
    if (selectedId.includes(firstLetter)) {
      let temp = selectedId.filter(item => item !== firstLetter);
      setSelectedId(temp);
    }
    else {      
      let temp = [...selectedId, firstLetter]
      setSelectedId(temp)
    }
  }

  /** Check if location is in the filter array. Set it to state if not. */
  const selectLocation = (location : string) => {
    if (selectedLocation.includes(location)) {
      let temp = selectedLocation.filter(item => item !== location);
      setSelectedLocation(temp);
      }
      else  {
        let temp = [...selectedLocation, location]
        setSelectedLocation(temp)
      }
  }

  /** Check if connection state is in the filter array. Set it to state if not. */
  const selectConnection = (connection : number) => {
    if (selectedConnection.includes(connection)) {
      let temp = selectedConnection.filter(item => item !== connection);
      setSelectedConnection(temp);
      }
      else  {
        let temp = [...selectedConnection, connection]
        setSelectedConnection(temp)
      }
  }

  /** Set charge to state */
  const selectCharge = ()=> {
    let tempCharge = chargeRef.current?.value != null ? +chargeRef.current.value : 0;
    setSelectedCharge(tempCharge);
  }

  /** Initialize state values */
  useEffect(()  => {
        formatFilter(props.batteryList);
  }, [])

  useEffect(() => {
      setSelectedId(formatedProps.idFirstLetters);
      setSelectedCharge(Math.max(...formatedProps.stateOfCharge));
      setSelectedConnection(formatedProps.connectionStatus);
      setSelectedLocation(formatedProps.allLocations);
  }, [formatedProps])

  
  return (
  <div className={styles.Filter}>
    <div className={styles.sectionContainer}> Sort by:
        <select name="Sort by" disabled={true}>  
          <option value="-">-</option>
          <option value="id">Id</option>
          <option value="location">Location</option>
          <option value="connectionStatus">Connection status</option>
          <option value="stateOfCharge">State of charge</option>
        </select>
    </div>
    <div id={styles.id} ref={idRef} className={styles.sectionContainer}>
        <span>Id</span>
        <div className={styles.buttonContainer}>
          {formatedProps?.idFirstLetters.map((item, index) =>
          <button key={index}
          className={selectedId.includes(item) ? styles.selectedId : ''}
          onClick={() => selectId(item)}>
            {item}
          </button>)}
        </div>
    </div>
    <div ref={locationRef} className={styles.sectionContainer} id={styles.location}>
          <span>Location</span>
          <div className={styles.buttonContainer}>
            { formatedProps.allLocations.map((item, index) =>
            <button
            key={index}
            onClick={()=>
            selectLocation(item)}
            value={item.toLowerCase()}
            className={selectedLocation.includes(item) ? styles.locationButton : ''}>
            {item}
            </button>) }
          </div>
        
    </div>
    <div className={styles.sectionContainer} id={styles.connectionStatus}>
        <span>Connection status: {selectedConnection}</span>
        <div className={styles.buttonContainer}>
          { formatedProps.connectionStatus.map((item,index) =>
          <button
            key={index}
            className={selectedConnection.includes(item) ? styles.connectionButton : ''}
            onClick={() => selectConnection(item)}>
            {item}
          </button>) }
        </div>
    </div>
    <div className={`${styles.stateOfCharge} ${styles.sectionContainer}`}>
      <span>State of charge {selectedCharge < 0 ? 'N/A' : selectedCharge}</span> 
      <input 
          id={styles.leftRange}
          type="range" 
          ref={chargeRef}
          name="State of charge"
          max={Math.max(...formatedProps.stateOfCharge)}
          min={Math.min(...formatedProps.stateOfCharge)}
          defaultValue={Math.max(...formatedProps.stateOfCharge)}
          onChange={selectCharge}
        />
    </div>
    <button 
      type="submit" 
      disabled={true}
      id={styles.filterBtn} 
      onClick={() => 
      props.setFilterProp !== undefined ? props.setFilterProp(selectedId, selectedLocation, selectedConnection, selectedCharge) : <></>}>Filter</button>
  </div>
  )
};

export default Filter;
