import React, { FC, useCallback, useContext, useEffect, useRef, useState } from 'react';
import styles from './BatteryList.module.scss';
import { BatteryInterface, FilterInterface } from '../../Interfaces';
import Pagination from '../Pagination/Pagination';
import { PageContext } from '../MainPage/MainPage';
import Filter from '../Filter/Filter';



/** REACT COMPONENT – Container for battery Slices */


interface BatteryListProps {
  batteryList: BatteryInterface[];
  setBatteryItem: ( batteryItem : BatteryInterface ) => void;
}
const BatteryList: FC<BatteryListProps> = (props : BatteryListProps) => {

  /** Clicked state represented by a number: 1 Not clicked; 2 Clicked - Loading data; 3 Data fetched  */
  const tableRowRef = useRef<HTMLDivElement>(null);
  const [batterySlice, setBatterySlice] = useState<BatteryInterface[]>(props.batteryList.slice(0,10));
  const {page, setPage} = useContext(PageContext);
  const [filter, setFilter] = useState<{idFirstLetters: string[], allLocations: string[], connectionStatus: number[], stateOfCharge : number}>();

  
  /** Initialize batterySlice */
  useEffect(() => {
      const tempList = props.batteryList?.slice(0, 10);
      setBatterySlice(tempList);
  }, [])

  /** Fetch data from API and switch to BatteryList component */
  const selectBatteryItem = (i : number) => {
    let batteryItemIndex : number = props.batteryList?.findIndex(item => item.id == batterySlice[i].id) as number;
    let batteryItemTemp : BatteryInterface = props.batteryList[batteryItemIndex];
    const tempPage =  page[1] != (null || undefined) ? page[1] : 0;
    setPage([tempPage, 1]);
    fetch('https://f2byongc84.execute-api.eu-central-1.amazonaws.com/webdev_test_fetch_batteries?id='+batteryItemTemp.id)
    .then(response => response.json())
    .then(json => { props.setBatteryItem(json); setPage([tempPage, 3])})
  }

  /** Set filters for battery list */
  const setFilterState = (id: string[], location : string[], connection: number[], charge : number)  => {
    setFilter({ idFirstLetters : id, allLocations : location, connectionStatus :connection, stateOfCharge : charge });
  }

  /** Set page number. Stored as actual values from 1 to onwards  */
  const setSliceByPageNumber = (pageNumber : number) => {
    const tempSlice = props.batteryList.slice((pageNumber - 1) * 10, pageNumber * 10);
    setBatterySlice(tempSlice);
  }
    
  /** Use effect when filter state has changed; set filtered data as batterySlice  */
  useEffect(()=> {
    let filterList : BatteryInterface[] = [];
    if (!!batterySlice && !!filter) {
    filterList = batterySlice.reduce((value : BatteryInterface[], item) => {
      if(
        filter.idFirstLetters.includes(item.id.charAt(0)) &&
        filter.allLocations.includes(item.location) &&
        filter.connectionStatus.includes(item.connectionStatus) &&
        filter.stateOfCharge  > item.stateOfCharge
        )  {
        value.push(item)
        }
        return value;   
    }, [])
    setBatterySlice(filterList);
    }
  }, [filter]);

  return(
  <div className={styles.BatteryList}>
      <div id={styles.filterAndTable}>
        <Filter 
          batteryList={ batterySlice }
          setFilterProp={(id, location, connection, charge) => setFilterState(id, location, connection, charge)} />
        <div id={styles.tableContainer}>
          <div id={styles.table}>
              <div className={styles.tableRow}>
                <span className={styles.th}>Id</span>
                <span className={styles.th}>Location</span>
                <span className={styles.th}>Capacity</span>
                <span className={styles.th}>Voltage</span>
                <span className={styles.th}>Connection Status</span>
                <span className={styles.th}>Last Connection Time</span>
                <span className={styles.th}>State of Charge</span>
                <span className={styles.th}>State of Health</span>
                <span className={styles.th}>Recent Issues</span>
              </div>
          
            { batterySlice?.map((slicedBatteryList, index) => {
              return (
              <div className={styles.tableRow} ref={tableRowRef} key={index} onClick={() => selectBatteryItem(index)}>
                <span className={styles.tableData}>{slicedBatteryList.id}</span>
                <span className={styles.tableData}>{slicedBatteryList.location != (null || undefined) ? slicedBatteryList.location : 'N/A'}</span>
                <span className={styles.tableData}>{slicedBatteryList.capacity}</span>
                <span className={styles.tableData}>{slicedBatteryList.voltage}</span>
                <span className={styles.tableData}>
                  {
                  slicedBatteryList.connectionStatus === 1 ? 'Deep discharge' :
                  slicedBatteryList.connectionStatus === 2 ? 'Overheating' :
                  slicedBatteryList.connectionStatus === 3 ? 'Unknown anomaly' :
                  'Missing data'
                  }
                  </span>
                <span className={styles.tableData}>{new Date(slicedBatteryList.lastConnectionTime).toLocaleString()}</span>
                <span className={styles.tableData}>{slicedBatteryList.stateOfCharge != (null || undefined) ? slicedBatteryList.stateOfCharge : 'N/A' }</span>
                <span className={styles.tableData}>{slicedBatteryList.stateOfHealth != (null || undefined) ? slicedBatteryList.stateOfHealth : 'N/A'}</span>
                <span className={styles.tableData}>{slicedBatteryList.recentIssues.length > 0 ? slicedBatteryList.recentIssues.join(', '): 'N/A'}</span>
              </div>
              )}) }
          </div>
        </div>
      </div> 
    <Pagination setPageNumber={number => setSliceByPageNumber(number)} numberOfPages={20}></Pagination> 
  </div>
  )
}

export default BatteryList;
