import React, { Fragment } from "react";
import { findByType } from "../libs/comp";

const Panel = () => null;
class Workspace extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.renderPanels = this.renderPanels.bind(this);
    }

    renderPanels() {
        const { children } = this.props;
        const panels = findByType(children, Panel);
        return panels.length > 0 ? (
            panels.map((panel, index) => (
                <div key={index} className={'workspace-panel'}>{panel.props.children}</div>
            ))
        ) : null;
    }

    render() {
        return (
            <Fragment>
                {/*
                <div className="btn-group btn-group-toggle">
                    <button className="btn btn-outline-primary"><i aria-label="Cards View" className="fas fa-grip-horizontal fa-3x"></i></button>
                    <button className="btn btn-outline-primary"><i aria-label="List View" className="fas fa-grip-lines fa-3x"></i></button>
                </div>
                */}
                <div className="workspace-content">
                    {this.renderPanels()}
                </div>
            </Fragment>
        );
    }
  }

Workspace.Panel = Panel;

export default Workspace;