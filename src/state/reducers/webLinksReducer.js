//import LocalStore from '../../libs/localStore';
import initialState from '../../../static/system/weblinks_initial_state.json';
//import branches from '../../../static/data/branches.json';

export const SET_SELECTED_FILTER = 'workspace/links/set_selected_filter';
export const GET_SELECTED_FILTER = 'workspace/links/get_selected_filter';
export const SAVE_FAVORITES_LINKS = 'workspace/links/save_favorites_links';
export const LOAD_FAVORITES_LINKS = 'workspace/links/load_favorites_links';
export const SET_LINK_FAVORITE = 'workspace/links/set_link_fav';
export const UPDATE_FAVORITE_LINKS = 'workspace/links/update_favorite_links';
export const LOAD_FAVORITE_LINKS = 'workspace/links/load_favorite_links';

const DATASTORE = {
    FAVORITE_LINKS: 'workspace/links/favLinks',
    SELECTED_FILTER: 'workspace/links/selected_filter'
};


export default function workspaceReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SELECTED_FILTER:
            return {...state, ...action.filter };
        case GET_SELECTED_FILTER:
            return {...state, ...action.filter };
        case UPDATE_FAVORITE_LINKS:
            return {...state, ...action.linksList};
        case LOAD_FAVORITE_LINKS: 
            return {...state, ...state.workspaceLinks, linksList: action.linksList};
        default:
            return state;
    }
}

export const ActionSetSelectedFilter = (dispatch, filter) => {// TODO: update this to use the localStore class
    const dataStore = JSON.stringify(filter);
    window.localStorage.setItem(DATASTORE.SELECTED_FILTER, dataStore);
    return dispatch({ type: SET_SELECTED_FILTER, filter });
}

export const ActionGetSelectedFilter = (dispatch) => {// TODO: update this to use the localStore class
    let dataStore = {
        selectedFilterHash: initialState.selectedFilterHash,
        selectedTreeData: initialState.selectedTreeData
    };
    if (typeof window !== `undefined`) {
        dataStore = JSON.parse(window.localStorage.getItem(DATASTORE.SELECTED_FILTER));
    }
    dispatch({ type: GET_SELECTED_FILTER, filter: dataStore });
}

export const ActionLoadFavoriteLinks = (dispatch, linksList) => {
    //const dataStore = LocalStore.getItem(DATASTORE.FAVORITE_LINKS);
    let dataStore = [];
    if(typeof window !== `undefined`) {
        dataStore = JSON.parse(window.localStorage.getItem(DATASTORE.FAVORITE_LINKS));
    }
    const linksListWithFav = linksList.group.map(g => {
        let links = g.links.map(l => ({...l, fav: dataStore?.includes(l.hash)}));
        return {...g, links};
    });
    return dispatch({ type: LOAD_FAVORITE_LINKS, linksList: linksListWithFav });
}

export const ActionToggleFavoriteLinks = (dispatch, hash, linksList) => {
    let oldDataStore = [];
    //oldDataStore = LocalStore.getItem(DATASTORE_FAVORITE_LINKS);
    if(typeof window !== `undefined`) {
        oldDataStore = JSON.parse(window.localStorage.getItem(DATASTORE.FAVORITE_LINKS));
    }
    const linksListWithFav = linksList.group.map(g => {
        let links = g.links.map(l => ({...l, fav: oldDataStore?.includes(l.hash)}));
        return {...g, links};
    });
    const updatedLinksList = linksListWithFav.map(g => {
        const links = g.links.map(l => l.hash === hash ?  {...l, fav: !l.fav } : l);
        return {...g, links};
    });
    let savedLinks = [];
    updatedLinksList.forEach(g => {
        g.links.forEach(l => {
            if((l.fav)) {
                savedLinks.push(l.hash);
            }
        });
    });
    //LocalStore.setItem(DATASTORE_FAVORITE_LINKS, savedLinks);
    const newDataStore = JSON.stringify(savedLinks);
    window.localStorage.setItem(DATASTORE.FAVORITE_LINKS, newDataStore);
    return dispatch({ type: UPDATE_FAVORITE_LINKS, linksList: updatedLinksList });
    /*
    let savedLinks = [];
    const updatedLinksList = linksList.map(g => {
        const links = g.links.map(l => {
            if (l.id === hash) {
                return {...l, fav: !l.fav };
            }
            return l;
        });
        return {...g, links };
    });
    return dispatch({ type: SET_LINK_FAVORITE, linksList: updatedLinksList });
    */
}

/*
const saveFavData = (branch, linksList, id) => {
    let savedLinks = [];
    linksList.forEach(g => {
        g.links.forEach(l => {
            if((l.id !== id && l.fav) || (l.id === id && !l.fav)) {
                savedLinks.push(l.id);
            }
        });
    });
    const dataStore = JSON.stringify(savedLinks);
    window.localStorage.setItem(`favLinks${branch}`, dataStore);
}

toggleFavLink(id) {
        const { toggleFavLink, branch, workspace } = this.props;
        const { linksList } = workspace;
        saveFavData(branch, linksList, id);
        toggleFavLink(branch, linksList, id);
    }

    const loadFavData = (branch, linksList) => {
    let dataStore = [];
    if(typeof window !== `undefined`) {
        dataStore = JSON.parse(window.localStorage.getItem(`favLinks${branch}`));
    }
    const linksListWithFav = linksList.map(g => {
        let links = g.links.map(l => {
            return {...l, fav: dataStore?.includes(l.id)};
        });
        return {...g, links};
    });
    return linksListWithFav;
}
*/