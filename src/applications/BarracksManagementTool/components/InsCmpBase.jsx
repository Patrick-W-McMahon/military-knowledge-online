import React, { Fragment, useState } from "react";
import './InsComponent.css';

const initalState = {
    open: true
};

const InsCmpBase = ({ title, children, className }) => {
    const [ state, setState] = useState(initalState);
    const togglePanelView = () => setState({...state, open: !state.open});
    const { open } = state;
    return (
        <div className={`InsComp${className ? ` ${className}` : ''} ${open? 'open': 'closed'}`}>
            <header onClick={togglePanelView}>{title.charAt(0).toUpperCase() + title.slice(1)}</header>
            {open?<div className="content">{children}</div>:null}
        </div>
    );
}

export default InsCmpBase;