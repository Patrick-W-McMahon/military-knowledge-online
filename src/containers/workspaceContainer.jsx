import React, { Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { ActionLoadCategories, ActionLoadFavoritesLinks, ActionLoadLinksList, ActionSaveFavoritesLinks, ActionSelectWorkspaceTab, ActionSetGroupFilter, ActionToggleLinkFav } from '../state/reducers/workspaceReducer';
import { flattenLinksList, filterActiveLinks } from '../libs/common';

//const defaultFilter = "226a6f61db3c80a2ac5f6b4c1f1fb3dd1030ba9239c40cb367304c58eeac0103";

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

class WorkspaceContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 0,
            //selectedFilter: defaultFilter,
            //filteredValidCards: [],
            //filteredGroupLinks: []
        };
        this.setTab = this.setTab.bind(this);
        this.selectFilter = this.selectFilter.bind(this);
        this.toggleFavLink = this.toggleFavLink.bind(this);
    }

    UNSAFE_componentWillMount() {
        const { categories, linksList, loadCategories, loadLinksList, branch, setGroupFilter, workspace, loadFavoriteLinks } = this.props;
        const LoadData = async() => {
            const linksListWithFav = loadFavData(branch, linksList);
            await loadLinksList(branch, linksListWithFav);
            await loadCategories(branch, categories);
            await setGroupFilter(branch, categories, linksListWithFav, workspace.selectedFilter);
            await loadFavoriteLinks(branch);
        }
        LoadData();
        /*
        const setDefaultConfig = async() => {
            const { categories, linksList, selectedFilter } = workspace;
            await setGroupFilter(branch, categories, linksList, selectedFilter);
        }
        setDefaultConfig();
        */
    }
    
    /*
    componentDidMoun() {
        const { setGroupFilter, branch, workspace  } = this.props;
        const { categories, linksList, selectedFilter } = workspace;
        const setDefaultConfig = async() => {
            await setGroupFilter(branch, categories, linksList, selectedFilter);
        }
        setDefaultConfig();
    }
    */
    setTab(tabId) {
        this.setState({ selectedTab: tabId });
    }

    selectFilter(hash) {
        const { branch, categories, setGroupFilter, workspace } = this.props;
        const { linksList } = workspace;
        setGroupFilter(branch, categories, linksList, hash);
    }

    toggleFavLink(id) {
        const { toggleFavLink, branch, workspace } = this.props;
        const { linksList } = workspace;
        saveFavData(branch, linksList, id);
        toggleFavLink(branch, linksList, id);
    }

    render() {
        const { ImportProfile, children, categories, showInfo, workspace, workspaceConfig } = this.props;
        const { linksList } = workspace;
        const activeLinksList = filterActiveLinks(linksList);
        const { selectedTab } = this.state;
        const injectionProps = {
            ImportProfile,
            setTab: this.setTab,
            selectedTab,
            filterGroups: categories,
            selectFilter: this.selectFilter,
            showInfo,
            linksList: activeLinksList,
            linksListFlatten: flattenLinksList(activeLinksList),
            workspaceConfig,
            toggleFavLink: this.toggleFavLink
        };
        const childrenWithProps = React.Children.map(children, child => React.cloneElement(child, injectionProps));
        return <Fragment>{childrenWithProps}</Fragment>;
    }
};

WorkspaceContainer.propTypes = {
    branch: PropTypes.string,
    categories: PropTypes.array,
    linksList: PropTypes.array
};

const mapStateToProps = (state, props) => {
    const { error, config } = state.workspace;
    const { workspace } = state.workspace.branches[props.branch];
    return { workspace, error, workspaceConfig: config };
};

const mapDispatchToProps = dispatch => ({
    loadCategories: (branch, categories) => ActionLoadCategories(dispatch, branch, categories),
    loadLinksList: (branch, linksList) => ActionLoadLinksList(dispatch, branch, linksList),
    loadFavoriteLinks: branch => ActionLoadFavoritesLinks(dispatch, branch),
    saveFavoriteLinks: (branch, links) => ActionSaveFavoritesLinks(dispatch, branch, links),
    selectWorkspaceTab: (branch, tabId) => ActionSelectWorkspaceTab(dispatch, branch, tabId),
    setGroupFilter: (branch, categories, linksList, hash) => ActionSetGroupFilter(dispatch, branch, categories, linksList, hash),
    toggleFavLink: (branch, linksList, id) => ActionToggleLinkFav(dispatch, id, linksList, branch)
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceContainer);