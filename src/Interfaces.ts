
    export interface BatteryInterface {
        id: string;
        location: string;
        capacity: number;
        voltage: number;
        connectionStatus: number;
        lastConnectionTime: string;
        stateOfCharge: number;
        stateOfHealth?: number;
        recentIssues: number[];
        measurements: { 
            timestamp: string;
            stateOfCharge?: number 
         }[]
    }

    export interface FilterInterface {
     
            idFirstLetters : string[];
            allLocations : string[];
            connectionStatus : number[],
            stateOfCharge : number[],
        
    }

    export interface FilterMethod {
        setFilter : (idFirstLetters : string[],
            allLocations : string[],
            connectionStatus : number[],
            stateOfCharge : number) => void
    }

   
