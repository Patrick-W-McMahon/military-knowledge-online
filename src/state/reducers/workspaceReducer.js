import * as initialState from '../../../static/system/workspace_initial_state.json';
import branches from '../../../static/data/branches.json';

export const SAVE_FAVORITES_LINKS = 'workspace/save_favorites_links';
export const LOAD_FAVORITES_LINKS = 'workspace/load_favorites_links';
export const LOAD_LINKS_LIST = 'workspace/load_links_list';
export const LOAD_CATEGORIES = 'workspace/load_categories';
export const SET_CATEGORY_FILTER = 'workspace/change_category_filter';
export const SET_WORKSPACE_TAB = 'workspace/set_tab';
export const CATEGORY_FILTER_SET_SUCESS = 'workspace/category_filter_set_success';
export const Filtered_LINKS_LIST_SUCCESS = 'workspace/filtered_links_list_success';
export const Filtered_LINKS_LIST_FAILED = 'workspace/filtered_links_list_failed';
export const SET_LINK_EDIT_MODE = 'workspace/set_link_edit_mode';
export const SET_LINK_FAVORITE = 'workspace/set_link_fav';

//category function calls
export const GET_LINKS_BY_TAGS = 'getLinksByTags';
export const GET_ALL_LINKS = 'getAllLinks';
export const GET_FAV_LINKS = 'getFavLinks';

const getCategoryByHash = (categories, hash) => categories.find(c => c.hash === hash);

const getLinksByTags = (tags, linksList) => linksList.map(g => {
    const links = g.links.map(l => {
        let active = false;
        [...tags].forEach(t => {
            if (l.categories !== null && l.categories.includes(t)) {
                active = true;
            }
        });
        return {...l, active };
    });
    return {...g, links };
});

const getFavLinks = linksList => linksList.map(g => {
    const links = g.links.map(l => ({...l, active: l.fav }));
    return {...g, links };
});

const getIntialState = () => {
    let newState = {
        ...initialState.workspaceBaseState,
        branches: {}
    };
    branches.forEach(b => {
        newState.branches[b.path] = {...b, ...initialState.branchState };
    });
    return newState;
}

const getAllLinks = (linksList) => linksList.map(g => ({...g, links: g.links.map(l => ({...l, active: true })) }));
const workspaceInitialState = getIntialState();

export default function workspaceReducer(state = workspaceInitialState, action) {
    switch (action.type) {
        case LOAD_CATEGORIES:
            return {...state,
                branches: {
                    ...state.branches,
                    [action.branch]: {
                        ...state.branches[action.branch],
                        workspace: {
                            ...state.branches[action.branch].workspace,
                            categories: action.categories
                        }
                    }
                }
            };
        case LOAD_LINKS_LIST:
        case Filtered_LINKS_LIST_SUCCESS:
            return {...state,
                branches: {
                    ...state.branches,
                    [action.branch]: {
                        ...state.branches[action.branch],
                        workspace: {
                            ...state.branches[action.branch].workspace,
                            linksList: action.linksList
                        }
                    }
                }
            };
        case SET_WORKSPACE_TAB:
            return {...state,
                branches: {
                    ...state.branches,
                    [action.branch]: {
                        ...state.branches[action.branch],
                        workspace: {
                            ...state.branches[action.branch].workspace,
                            activeWorkspaceTab: action.tabId
                        }
                    }
                }
            };
        case SET_CATEGORY_FILTER:
            return {...state,
                branches: {
                    ...state.branches,
                    [action.branch]: {
                        ...state.branches[action.branch],
                        workspace: {
                            ...state.branches[action.branch].workspace,
                            selectedFilter: action.groupFilterHash
                        }
                    }
                }
            };
        case LOAD_FAVORITES_LINKS:
            return {...state,
                branches: {
                    ...state.branches,
                    [action.branch]: {
                        ...state.branches[action.branch],
                        workspace: {
                            ...state.branches[action.branch].workspace,
                            favoriteLinks: action.favoriteLinks
                        }
                    }
                }
            };
        case SET_LINK_FAVORITE:
            return {...state,
                branches: {
                    ...state.branches,
                    [action.branch]: {
                        ...state.branches[action.branch],
                        workspace: {
                            ...state.branches[action.branch].workspace,
                            linksList: action.linksList
                        }
                    }
                }
            };
        case CATEGORY_FILTER_SET_SUCESS:
            return {...state };
        case SET_LINK_EDIT_MODE:
            return {
                ...state,
                config: {
                    linkEditMode: action.mode
                }
            }
        default:
            return state;
    }
}

export const ActionLoadCategories = (dispatch, branch, categories) => {
    dispatch({ type: LOAD_CATEGORIES, categories, branch })
}

export const ActionLoadLinksList = (dispatch, branch, linksList) => {
    return dispatch({ type: LOAD_LINKS_LIST, linksList, branch });
}

export const ActionSelectWorkspaceTab = (dispatch, tabId) => {
    return dispatch({ type: SET_WORKSPACE_TAB, tabId });
}

export const ActionSetGroupFilter = async(dispatch, branch, categories, linksList, groupFilterHash) => {
    await dispatch({ type: SET_CATEGORY_FILTER, branch, groupFilterHash });
    await ActionFilterLinks(dispatch, branch, categories, linksList, groupFilterHash);
    return dispatch({ type: CATEGORY_FILTER_SET_SUCESS });
}

export const ActionFilterLinks = (dispatch, branch, categories, linksList, groupFilterHash) => {
    const category = getCategoryByHash(categories, groupFilterHash);
    if (category) {
        const { func, val } = category.action;
        switch (func) {
            case GET_LINKS_BY_TAGS:
                return dispatch({ type: Filtered_LINKS_LIST_SUCCESS, branch, linksList: getLinksByTags(val, linksList) });
            case GET_ALL_LINKS:
                return dispatch({ type: Filtered_LINKS_LIST_SUCCESS, branch, linksList: getAllLinks(linksList) });
            case GET_FAV_LINKS:
                return dispatch({ type: Filtered_LINKS_LIST_SUCCESS, branch, linksList: getFavLinks(linksList) });
            default:
                return dispatch({ type: Filtered_LINKS_LIST_FAILED, error: `Error: unknown function call "${func}". function not found. Err 404` });
        }
    }
}

export const ActionSaveFavoritesLinks = (dispatch, branch, favoritesLinks) => { // this could be old
    //console.log('ActionSaveFavoritesLinks', branch, favoritesLinks);
    //favoritesLinks.forEach(l => {
    //    localStorage.setItem(`${branch}_favorites_links`, JSON.stringify(l));
    //});
    return dispatch({ type: SAVE_FAVORITES_LINKS, branch, favoritesLinks });
}

export const ActionLoadFavoritesLinks = (dispatch, branch) => { // this could be old
    //console.log('ActionLoadFavoritesLinks', branch);
    //const data = [];
    //const data = JSON.parse(localStorage.getItem(`${branch}_favorites_links`));
    //console.log('data check: ', data);
    /*
    if (data) {
        data.forEach(l => {
            console.log('favorite link: ', l);
        });
    }
    */
    return dispatch({ type: LOAD_FAVORITES_LINKS, branch, favoriteLinks: [] });
}

export const ActionSetLinkEditMode = (dispatch, val) => {
    return dispatch({ type: SET_LINK_EDIT_MODE, mode: val });
}

export const ActionToggleLinkFav = (dispatch, id, linksList, branch) => {
    const updatedLinksList = linksList.map(g => {
        const links = g.links.map(l => {
            if (l.id === id) {
                return {...l, fav: !l.fav };
            }
            return l;
        });
        return {...g, links };
    });
    return dispatch({ type: SET_LINK_FAVORITE, branch, linksList: updatedLinksList });
}