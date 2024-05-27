
import buildingTemplate from '../../applications/BarracksManagementTool/templates/buildingTemplate.json';
import unitTemplate from '../../applications/BarracksManagementTool/templates/unitTemplate.json';


export const SET_DATASET = 'applications/barracks_management/set_dataset';
export const GET_DATASET = 'applications/barracks_management/get_dataset';
export const GET_BUILDINGS = 'applications/barracks_management/get_buildings';
export const CREATE_UNIT = 'applications/barracks_management/create_unit';



const DATASTORE = {
    BM_PEOPLE: 'applications/barracksManagement/people',
    BM_BUILDINGS: 'applications/barracksManagement/buildings',
    BM_ROOMS: 'applications/barracksManagement/rooms',
    BM_SUITES: 'applications/barracksManagement/suites',
    BM_UNITS: 'applications/barracksManagement/units',
};

const initialState = {
    buildings: [],
    people: [],
    units: []
}


export default function appClockReducer(state = initialState, action) {
    switch (action.type) {
        case SET_DATASET:
            return {...state, ...action };
        case GET_DATASET:
            return {...state, ...action.dataStore };
        case GET_BUILDINGS:
            return {...state, ...action.buildings };
        case CREATE_UNIT:
            return {...state, ...action.units }
        default:
            return state;
    }
}

export const ActionGetDataset = (dispatch) => {
    let dataStore = initialState;
    if (typeof window !== `undefined`) {
        dataStore.buildings = JSON.parse(window.localStorage.getItem(DATASTORE.BM_BUILDINGS)) || [];
        dataStore.people = JSON.parse(window.localStorage.getItem(DATASTORE.BM_PEOPLE)) || [];
        dataStore.units = JSON.parse(window.localStorage.getItem(DATASTORE.BM_UNITS)) || [];
    }
    dispatch({ type: GET_DATASET, dataStore });
}

export const ActionCreateBuilding = (dispatch, label, address) => {
    if(label === undefined) {
        console.error('Error: in ActionCreateBuilding label undefined');
        return;
    }
    if(address === undefined) {
        console.error('Error: in ActionCreateBuilding address undefined');
        return;
    }
    let buildings = [];
    if(typeof window !== `undefined`) {
        buildings = JSON.parse(window.localStorage.getItem(DATASTORE.BM_BUILDINGS)) || [];
    }
    buildings.push({ ...buildingTemplate, label, address });
    window.localStorage.setItem(DATASTORE.BM_BUILDINGS, JSON.stringify(buildings));
    return dispatch({ type: GET_DATASET, buildings: buildings });
}

export const ActionCreateUnit = (dispatch, unit) => {
    if(unit === undefined) {
        console.error('Error: in ActionCreateUnit unit undefined');
        return;
    }
    let units = [];
    if(typeof window !== `undefined`) {
        units = JSON.parse(window.localStorage.getItem(DATASTORE.BM_UNITS)) || [];
    }
    units.push({ ...unitTemplate.dataTemplate, ...unit });
    window.localStorage.setItem(DATASTORE.BM_UNITS, JSON.stringify(units));
    return dispatch({ type: CREATE_UNIT, units });
}
/*
export const ActionDeleteTimer = (dispatch, index, timers) => {
    if(index === undefined) {
        console.error('Error: in ActionCreateTimer index undefined');
        return;
    }
    if(timers === undefined) {
        console.error('Error: in ActionCreateTimer timers undefined');
        return;
    }
    let dataStore = [];
    if(typeof window !== `undefined`) {
        dataStore = JSON.parse(window.localStorage.getItem(DATASTORE.APP_CLOCK_TIMERS)) || [];
    }
    const newDataStore = dataStore.filter((t,i) => i !== index);
    window.localStorage.setItem(DATASTORE.APP_CLOCK_TIMERS, JSON.stringify(newDataStore));
    return dispatch({ type: GET_TIMERS, timers: newDataStore });
}

export const ActionSetTimer = (dispatch, timers) => {
    const dataStore = JSON.stringify(timers);
    window.localStorage.setItem(DATASTORE.APP_CLOCK_TIMERS, dataStore);
    return dispatch({ type: SET_TIMERS, timers: dataStore });
}

export const ActionGetTimers = (dispatch) => {
    let dataStore = initialState;
    if (typeof window !== `undefined`) {
        dataStore.timers = JSON.parse(window.localStorage.getItem(DATASTORE.APP_CLOCK_TIMERS)) || [];
    }
    dispatch({ type: GET_TIMERS, timers: dataStore.timers });
}

export const ActionClearClockData = (dispatch) => {
    window.localStorage.setItem(DATASTORE.APP_CLOCK_TIMERS, JSON.stringify([]));
    dispatch({ type: GET_TIMERS, timers: [] });
}

export const ActionLoadClockData = (dispatch, data) => {
    try {
        let dataStore = [];
        if(typeof window !== `undefined`) {
            dataStore = JSON.parse(window.localStorage.getItem(DATASTORE.APP_CLOCK_TIMERS)) || [];
        }
        data.forEach(timer => {
            dataStore.push(timer);
        });
        window.localStorage.setItem(DATASTORE.APP_CLOCK_TIMERS, JSON.stringify(dataStore));
        console.log('Successfully loaded clock data from file');
        return dispatch({ type: GET_TIMERS, timers: dataStore });
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
}
*/