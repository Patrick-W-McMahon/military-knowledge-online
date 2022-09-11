import React, { Fragment } from "react";
//import ListEditView from "../components/editorComponents/ListEditView";

const WorkspaceSettingsForm = ({ linkEditMode, settingChanged, groupFilters, defaultGroupFilterHash }) => (
    <Fragment>
        <seciton className="outlined-section">
            <header>Links Configurations</header>
            <div>
                <h4>Link Edit Mode</h4>
                <label className="switch">
                    <input name="linkEditMode" type="checkbox" checked={linkEditMode} onChange={e => settingChanged(e.target.name , e.currentTarget.checked)} />
                    <span className="slider round"></span>
                </label>
                <h4>Default Group Filter</h4>
                <select name="set-default-group-filter" value={defaultGroupFilterHash} onChange={e => settingChanged(e.target.name, e.target.value)}>
                    {groupFilters.map((f, i) => (
                        <option value={f.hash}>{f.label}</option>
                    ))}
                </select>
                {/*
                <ListEditView>

                </ListEditView>
                */}
            </div>
        </seciton>
    </Fragment>
);

export default WorkspaceSettingsForm;