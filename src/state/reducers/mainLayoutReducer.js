export const OPEN_SIDE_MENU = 'mainLayout/open_side_menu';
export const CLOSE_SIDE_MENU = 'mainLayout/close_side_menu';
export const TOGGLE_SIDE_MENU = 'mainLayout/toggle_side_menu';
export const GET_SIDE_MENU_MODE = 'mainLayout/get_side_menu_mode';

const DATASTORE = {
    SIDE_MENU_MODE: 'system/sidemenu_mode'
};

const initialState = {
    sideMenu: false
};

export default function mainLayoutReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_SIDE_MENU:
            return {...state, side_menu: action.mode};
        case GET_SIDE_MENU_MODE:
            return {...state, side_menu: action.mode}
        default:
            return state;
    }
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