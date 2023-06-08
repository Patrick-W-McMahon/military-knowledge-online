export const OPEN_SIDE_MENU = 'mainLayout/open_side_menu';
export const CLOSE_SIDE_MENU = 'mainLayout/close_side_menu';
export const TOGGLE_SIDE_MENU = 'mainLayout/toggle_side_menu';
export const GET_SIDE_MENU_MODE = 'mainLayout/get_side_menu_mode';
export const TOGGLE_CONTENT_PANEL = 'mainLayout/toggle_content_panel';
export const GET_CONTENT_PANEL = 'mainLayout/get_content_panel';

const DATASTORE = {
    SIDE_MENU_MODE: 'system/sidemenu_mode',
    SELECTED_CONTENT_PANEL: 'system/selected_content_panel'
};

const initialState = {
    sideMenu: false,
    selectedContentPanel: 0
};

export default function mainLayoutReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_SIDE_MENU:
            return {...state, side_menu: action.mode};
        case GET_SIDE_MENU_MODE:
            return {...state, side_menu: action.mode}
        case TOGGLE_CONTENT_PANEL:
            return {...state, selectedContentPanel: action.value}
        case GET_CONTENT_PANEL:
            return {...state, selectedContentPanel: action.value}
        default:
            return state;
    }
}

export const ActionToggleContentPanel = (dispatch) => {
    let dataStore = 0;
    if(typeof window !== `undefined`) {
        dataStore = JSON.parse(window.localStorage.getItem(DATASTORE.SELECTED_CONTENT_PANEL));
    }
    const value = dataStore === 0 ? 1 : 0;
    window.localStorage.setItem(DATASTORE.SELECTED_CONTENT_PANEL, value);
    return dispatch({ type: TOGGLE_CONTENT_PANEL, value })
}

export const ActionGetContentPanel = (dispatch) => {
    let dataStore = 0;
    if(typeof window !== `undefined`) {
        dataStore = JSON.parse(window.localStorage.getItem(DATASTORE.SELECTED_CONTENT_PANEL));
        if(dataStore === null) {
            dataStore = 0;
        }
    }
    return dispatch({ type: GET_CONTENT_PANEL, value: dataStore })
}

export const ActionToggleSideMenu = (dispatch, mode) => {
    window.localStorage.setItem(DATASTORE.SIDE_MENU_MODE, JSON.stringify(mode));
    return dispatch({ type: TOGGLE_SIDE_MENU, mode });
}

export const ActionGetSideMenuMode = (dispatch) => {
    let dataStore = false;
    if(typeof window !== `undefined`) {
        dataStore = JSON.parse(window.localStorage.getItem(DATASTORE.SIDE_MENU_MODE));
    }
    return dispatch({ type: GET_SIDE_MENU_MODE, mode: dataStore });
}