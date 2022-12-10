import React, { Fragment } from "react";
import ListEditView from "../components/editorComponents/ListEditView";

const testGroupData = [
    "hello world",
    "this is a test",
    { title: "new filter" }
];

const testLinksData = [
    "link 1",
    "link 2"
];

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
                        <option key={i} value={f.hash}>{f.label}</option>
                    ))}
                </select>
                <h4>User defined filters</h4>
                <ListEditView data={testGroupData} />
                <h4>User defined links</h4>
                <ListEditView data={testLinksData} />
            </div>
        </seciton>
    </Fragment>
);

export default WorkspaceSettingsForm;