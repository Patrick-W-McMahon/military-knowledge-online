

export const SET_TIMERS = 'applications/clock/set_TIMERS';
export const GET_TIMERS = 'applications/clock/get_TIMERS';
export const CREATE_TIMER = 'applications/clock/create_timer';
export const DELETE_TIMER = 'applications/clock/delete_timer';
export const LOAD_CLOCK_DATA = 'applications/clock/load_clock_data';
export const EXPORT_CLOCK_DATA = 'applications/clock/export_clock_data';
export const UPDATE_CLOCK_TIMERS = 'applications/clock/update_clock_timers';



const DATASTORE = {
    APP_CLOCK_TIMERS: 'applications/clock/timers'
};

const initialState = {
    timers: []
}


export default function appClockReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TIMERS:
            return {...state, ...action };
        case GET_TIMERS:
            return {...state, timers:[...action.timers || []] };
        case LOAD_CLOCK_DATA: 
            return {...state, data: action};
        case EXPORT_CLOCK_DATA:
            return {...state, data: action};
        default:
            return state;
    }
}

export const ActionCreateTimer = (dispatch, timer, timers) => {
    if(timer === undefined) {
        console.error('Error: in ActionCreateTimer timer undefined');
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
    dataStore.push(timer);
    window.localStorage.setItem(DATASTORE.APP_CLOCK_TIMERS, JSON.stringify(dataStore));
    return dispatch({ type: GET_TIMERS, timers: dataStore });
}

export const ActionUpdateTimer = (dispatch, timer, timers) => {
    if(timer === undefined) {
        console.error('Error: in ActionUpdateTimer timer undefined');
        return;
    }
    if(timers === undefined) {
        console.error('Error: in ActionUpdateTimer timers undefined');
        return;
    }
    const index = timer.timerIndex;
    if(index < 0 || index > timers.length) {
        console.error('Error: in ActionUpdateTimer index out of range');
        return;
    }
    let dataStore = [];
    if(typeof window !== `undefined`) {
        dataStore = JSON.parse(window.localStorage.getItem(DATASTORE.APP_CLOCK_TIMERS)) || [];
    }
    dataStore[index] = timer;
    window.localStorage.setItem(DATASTORE.APP_CLOCK_TIMERS, JSON.stringify(dataStore));
    return dispatch({ type: GET_TIMERS, timers: dataStore });
}

export const ActionMoveTimer = (dispatch, index, direction, timers) => {
    if(timers === undefined) {
        console.error('Error: in ActionMoveTimer timers undefined');
        return;
    }
    if(index < 0 || index > timers.length) {
        console.error('Error: in ActionMoveTimer index out of range');
        return;
    }
    if((index === 0 && direction === 'up') || (index === timers.length && direction === 'down')) {
        console.error('Error: in ActionMoveTimer index move invalid');
        return;
    }
    let dataStore = [];
    if(typeof window !== `undefined`) {
        dataStore = JSON.parse(window.localStorage.getItem(DATASTORE.APP_CLOCK_TIMERS)) || [];
    }
    let p1, p2;
    switch(direction) {
        case "up":
            p1 = dataStore[index];
            p2 = dataStore[index - 1];
            dataStore[index] = p2;
            dataStore[index - 1] = p1;
        break;
        case "down":
            p1 = dataStore[index];
            p2 = dataStore[index + 1];
            dataStore[index] = p2;
            dataStore[index + 1] = p1;
        break;
        default:
            console.error('Error: in ActionMoveTimer unknown direction');
            return;
    }
    window.localStorage.setItem(DATASTORE.APP_CLOCK_TIMERS, JSON.stringify(dataStore));
    return dispatch({ type: GET_TIMERS, timers: dataStore });
}

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