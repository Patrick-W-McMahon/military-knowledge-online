import * as initialState from '../../../static/data/system/workspace_initial_state.json';
import branches from '../../../static/data/branches.json';


export const LOAD_LINKS_LIST = 'workspace/load_links_list';
export const LOAD_CATEGORIES = 'workspace/load_categories';
export const SET_CATEGORY_FILTER = 'workspace/change_category_filter';
export const SET_WORKSPACE_TAB = 'workspace/set_tab';
export const CATEGORY_FILTER_SET_SUCESS = 'workspace/category_filter_set_success';
export const Filtered_LINKS_LIST_SUCCESS = 'workspace/filtered_links_list_success';

//category function calls
export const GET_LINKS_BY_TAGS = 'getLinksByTags';
export const GET_ALL_LINKS = 'getAllLinks';

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

const getIntialState = () => {
    let newState = {
        branches: {}
    };
    branches.forEach(b => {
        newState.branches[b.path] = {...b, ...initialState };
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
        case CATEGORY_FILTER_SET_SUCESS:
            return {...state };
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
    console.log('action select workspace tab:', tabId);
    return dispatch({ type: SET_WORKSPACE_TAB, tabId });
}

export const ActionSetGroupFilter = async(dispatch, branch, categories, linksList, groupFilterHash) => {
    //const category = getCategoryByHash(categories, groupFilterHash);
    await dispatch({ type: SET_CATEGORY_FILTER, branch, groupFilterHash });
    console.log('bob', linksList)
    await ActionFilterLinks(dispatch, branch, categories, linksList, groupFilterHash);

    return dispatch({ type: CATEGORY_FILTER_SET_SUCESS });
}

export const ActionFilterLinks = (dispatch, branch, categories, linksList, groupFilterHash) => {
    let newlinksList = [];
    const category = getCategoryByHash(categories, groupFilterHash);
    if (category) {
        const { func, val } = category.action;
        switch (func) {
            case GET_LINKS_BY_TAGS:
                newlinksList = getLinksByTags(val, linksList);
                break;
            case GET_ALL_LINKS:
                newlinksList = getAllLinks(linksList);
                break;
            default:
                console.log(`Error: unknown function call "${func}". function not found. Err 404`);
                break;
        }
    }
    console.log('links list updated: ', newlinksList);
    return dispatch({ type: Filtered_LINKS_LIST_SUCCESS, branch, linksList: newlinksList });
}