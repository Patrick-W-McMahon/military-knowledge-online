import React, { Fragment } from "react";

const WorkspaceSettingsForm = ({ linkEditMode, settingChanged }) => (
    <Fragment>
        <seciton className="outlined-section">
            <header>Links Configurations</header>
            <div>
                <div>Link Edit Mode</div>
                <label className="switch">
                    <input name="linkEditMode" type="checkbox" checked={linkEditMode} onChange={e => settingChanged(e.target.name , e.currentTarget.checked)} />
                    <span className="slider round"></span>
                </label>
            </div>
        </seciton>
    </Fragment>
);

export default WorkspaceSettingsForm;