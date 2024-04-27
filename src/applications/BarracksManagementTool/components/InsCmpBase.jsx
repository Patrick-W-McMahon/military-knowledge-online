import React, { Fragment, useState } from "react";
import './InsComponent.css';

const initalState = {
    open: true
};

const InsCmpBase = ({ title, children }) => {
    const [ state, setState] = useState(initalState);
    const togglePanelView = () => setState({...state, open: !state.open});
    const { open } = state;
    return (
        <div className={`InsComp array-list-view ${open? 'open': 'closed'}`}>
            <header onClick={togglePanelView}>{title.charAt(0).toUpperCase() + title.slice(1)}</header>
            {open?<Fragment>{children}</Fragment>:null}
        </div>
    );
}

export default InsCmpBase;