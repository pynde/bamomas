import React, { FC, useEffect, useRef, useState, useContext, createContext } from 'react';
import { BatteryInterface } from '../../Interfaces';
import BatteryItem from '../BatteryItem/BatteryItem';
import BatteryList from '../BatteryList/BatteryList';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';
import Error from '../Error/Error';
import styles from './MainPage.module.scss';
import { WindowContext } from '../context/WindowContextProvider';


interface MainPageProps {};


export type PageArray = {
  /** 0 = Error, 1 = Loading animation, 2 = BatteryList, 3 = BatteryItem */
  page : [number, number],
  /** 0 = Error, 1 = Loading animation, 2 = BatteryList, 3 = BatteryItem */
  setPage: (page_array : [number, number]) => void
}

export const PageContext = createContext<PageArray>({
  page : [1,1],
  setPage : () => {}
});

const MainPage: FC<MainPageProps> = () => {
 
  const pageNo = { error: 0, loadingAnimation : 1, batteryList : 2,  batteryItem : 3} 
  /** Sets the current component as an array of two [previousPage, currentPage] */
  const [pageState, setPageState] = useState<[number, number]>([pageNo.loadingAnimation, pageNo.loadingAnimation]);
  const [batteryList, setBatteryList] = useState<BatteryInterface[]>([]);
  const [batteryItem, setBatteryItem] = useState<BatteryInterface>({ capacity: 0, id: '', connectionStatus: 0, measurements: [], stateOfCharge: 0, voltage: 0, recentIssues: [], lastConnectionTime: '', location: '' });
  const [error, setError] = useState<String>();
  const windowContext = useContext(WindowContext);
  

   useEffect(() => {
    setPageState([pageState[1], pageNo.loadingAnimation])
    fetch('https://f2byongc84.execute-api.eu-central-1.amazonaws.com/webdev_test_fetch_batteries?fields=id, location, capacity, voltage, connectionStatus, lastConnectionTime, stateOfCharge, stateOfHealth, recentIssues')
      .then(response => response.json())
      .then((json) => {
        json != null || undefined ? setBatteryList(json) : setError('Could not find batteries');
        setPageState([pageState[1], pageNo.batteryList]);
      })
      .catch(err => console.log(err));
  },[])

  

  const handleClick = (batteryItem : BatteryInterface) : void => {
    console.log(pageState); 
    const batteryId : string = batteryItem.id;
    batteryItem != null || undefined ? setBatteryItem(batteryItem) : setError('Could not find battery with id: ' + batteryId);
    setPageState([pageState[1], pageNo.batteryItem]); 
  }

  return(

    <PageContext.Provider value={{page : pageState, setPage : setPageState}}>
    <div className={styles.MainPage}> 
        { !!batteryList && pageState[1] === 2 ? 
        <BatteryList batteryList={batteryList} setBatteryItem={handleClick}/>
        : pageState[1] === 1 ?
        <LoadingAnimation/>
        : pageState[1] === 3 && !!batteryItem?
        <BatteryItem batteryItemProp={batteryItem}/>
        :
        <Error/>
        }
    </div>
    </PageContext.Provider>

  ) 
};

export default MainPage;
