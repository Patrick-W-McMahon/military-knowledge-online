import React, { Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { ActionLoadCategories, ActionLoadLinksList, ActionSelectWorkspaceTab, ActionSetGroupFilter } from '../state/reducers/workspaceReducer';
import { flattenLinksList, filterActiveLinks } from '../libs/common';

//const defaultFilter = "226a6f61db3c80a2ac5f6b4c1f1fb3dd1030ba9239c40cb367304c58eeac0103";

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
    }

    UNSAFE_componentWillMount() {
        const { categories, linksList, loadCategories, loadLinksList, branch, setGroupFilter, workspace } = this.props;
        const LoadData = async() => {
            await loadLinksList(branch, linksList);
            await loadCategories(branch, categories);
            await setGroupFilter(branch, categories, linksList, workspace.selectedFilter);
            
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

    getSavedLinks() {
        alert('Will be added in next update.');
    }

    selectFilter(hash) {
        const { branch, categories, linksList, setGroupFilter } = this.props;
        setGroupFilter(branch, categories, linksList, hash);
    }

    render() {
        const { ImportProfile, children, categories, showInfo, workspace } = this.props;
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
            linksListFlatten: flattenLinksList(activeLinksList)
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
    const { error } = state.workspace;
    const { workspace } = state.workspace.branches[props.branch];
    return { workspace, error };
};

const mapDispatchToProps = dispatch => ({
    loadCategories: (branch, categories) => ActionLoadCategories(dispatch, branch, categories),
    loadLinksList: (branch, linksList) => ActionLoadLinksList(dispatch, branch, linksList),
    selectWorkspaceTab: (branch, tabId) => ActionSelectWorkspaceTab(dispatch, branch, tabId),
    setGroupFilter: (branch, categories, linksList, hash) => ActionSetGroupFilter(dispatch, branch, categories, linksList, hash)
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceContainer);