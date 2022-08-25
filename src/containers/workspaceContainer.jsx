import React, { Fragment } from 'react';
import { connect } from "react-redux";
//import PropTypes from 'prop-types';
import { ActionImportProfile } from '../state/reducers/authReducer';

const defaultFilter = "8d266a6f9c9aced0b789f4ffa2ed07e8bbc177104b3b3f1e3c48f63f217e69a0";

const getCategoryByHash = (categories, hash) => categories.find(c => c.hash === hash);


class WorkspaceContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 0,
            selectedFilter: defaultFilter,
            filteredValidCards: [],
            filteredGroupLinks: []
        };
        this.setTab = this.setTab.bind(this);
        this.selectFilter = this.selectFilter.bind(this);
    }

    componentDidMount() {
        const { categories } = this.props;
        const category = getCategoryByHash(categories, this.state.selectedFilter);
        if(category){
            const { func, val } = category.action;
            this[func](val);
        }
    }

    setTab(tabId) {
        this.setState({ selectedTab: tabId });
    }

    getSavedLinks() {
        alert('Will be added in next update.');
    }

    getLinksByTags(tags) {
        const { groupLinks, validCards } = this.props;
        const filteredGroupLinks = [];
        groupLinks.forEach(g => {
            let gp = {fieldValue: g.fieldValue, links: [], totalCount: 0 };
            g.links.forEach(l => {
                let foundMatch = false;
                [...tags].forEach(t => {
                    if(l.categories !== null && l.categories.includes(t)) {
                        foundMatch=true;
                    }
                });
                if(foundMatch) {
                    gp.links.push(l);
                    gp.totalCount++;
                }
            });
            filteredGroupLinks.push(gp);
        });
        const filteredValidCards = [];
        validCards.forEach(l => {
            let foundMatch = false;
            [...tags].forEach(t => {
                if(l.categories !== null && l.categories.includes(t)) {
                    foundMatch=true;
                }
            });
            if(foundMatch) {
                filteredValidCards.push(l);
            }
        });
        this.setState({ filteredGroupLinks, filteredValidCards });
    }

    getAllLinks() {
        const { groupLinks, validCards } = this.props;
        this.setState({ filteredGroupLinks: groupLinks, filteredValidCards: validCards });
    }

    selectFilter(hash) {
        const { categories } = this.props;
        const catigory = getCategoryByHash(categories, hash);
        switch(catigory.action.obj) {
            case 'profile-action':
                this[catigory.action.func]();
            break;
            case 'links-action':
                this[catigory.action.func](catigory.action.val);
            break;
            default:
                console.log('err: unknown action');
        }
    }

    render() {
        const { ImportProfile, children, categories, showInfo } = this.props;
        const { selectedTab, filteredGroupLinks, filteredValidCards } = this.state;
        const injectionProps = {
            ImportProfile,
            setTab: this.setTab,
            selectedTab,
            filterGroups: categories,
            selectFilter: this.selectFilter,
            showInfo,
            validCards: filteredValidCards,
            groupLinks: filteredGroupLinks
        };
        const childrenWithProps = React.Children.map(children, child => React.cloneElement(child, injectionProps));
        return <Fragment>{childrenWithProps}</Fragment>;
    }
};
/*
WorkspaceContainer.PropTypes = {
    favoriteLinks: PropTypes.arrayOf(PropTypes.string)
};
*/
const mapStateToProps = (state) => {
    const { auth} = state;
    const {  error } = auth;
    return { error };
};

const mapDispatchToProps = dispatch => ({
    ImportProfile: profileData => ActionImportProfile(dispatch, profileData)
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceContainer);