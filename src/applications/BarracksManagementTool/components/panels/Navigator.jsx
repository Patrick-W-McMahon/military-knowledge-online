import React, { useState } from "react";
import * as Dockable from '../../../../components/DockableFrame';
import TreeMenu from 'react-simple-tree-menu';

const rootData = [
    {
        key: 'list_people',
        label: 'People'
    },
    {
        key: 'list_units',
        label: 'Unites'
    },
    {
        key: 'list_buildings',
        label: 'buildings'
    }
];


const initalState = {
    navData: rootData,
    intialOpenNodes: [],
    focusKey:rootData[0].key,
    activeKey:rootData[0].key
};

const Navigator = ({}) => {
    const [ state, setState] = useState(initalState);
    const ctx = Dockable.useContentContext();
    ctx.setTitle(`Navigator`);
    ctx.setPreferredSize(200, 250);

    const handleNavItemSelect = (item) => {
        const data = item.key.split('/');
        const hash = data[data.length -1];
        console.log({ selectedFilterHash: data[data.length -1], selectedTreeData: item });
        setState({ ...state, focusKey: hash, activeKey: hash });
    };
    const handleNavToggle = (item) => {
        console.log('toggle: ', item)
    };

    const { navData, intialOpenNodes, focusKey, activeKey }  = state;
    return (
        <div id="NavigatorPanel">
            <TreeMenu data={navData} initialOpenNodes={intialOpenNodes} focusKey={focusKey} activeKey={activeKey} onClickItem={handleNavItemSelect} onToggle={handleNavToggle} />
        </div>
    );

}

export default Navigator;