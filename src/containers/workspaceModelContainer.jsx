import React, { Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { ActionSetLinkEditMode } from '../state/reducers/workspaceReducer';

const initalState = {
    title: null,
    url: null,
    description: null,
    cardId: null,
    showConfigWindow: false,
    linkEditMode: false
};

class WorkspaceModelContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...initalState};
        this.handleSettingsChange = this.handleSettingsChange.bind(this);
    }

    UNSAFE_componentWillMount() {}
    componentDidMoun() {}

    handleSettingsChange(name, val) {
        const { setLinkEditMode, workspace } = this.props;
        const { config } = workspace;
        const { linkEditMode } = config
        switch(name) {
            case "linkEditMode":
                setLinkEditMode(!linkEditMode);
            break;
            default:
        }
        this.setState({...this.state, linkEditMode: !this.state.linkEditMode});
    }

    render() {
        const { children, workspace } = this.props;
        const injectionProps = {
            handleSettingsChange: this.handleSettingsChange,
            handleClose: this.handleClose,
            workspaceConfig: workspace.config
        };
        const childrenWithProps = React.Children.map(children, child => React.cloneElement(child, injectionProps));
        return <Fragment>{childrenWithProps}</Fragment>;
    }
};

WorkspaceModelContainer.propTypes = {
    branch: PropTypes.string,
    categories: PropTypes.array,
    linksList: PropTypes.array
};

const mapStateToProps = (state, props) => {
    return { workspace: state.workspace };
};

const mapDispatchToProps = dispatch => ({
    setLinkEditMode: val => ActionSetLinkEditMode(dispatch, val),
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceModelContainer);