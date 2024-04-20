import * as React from "react";
//import * as Dockable from "@hlorenzi/react-dockable";
import * as Dockable from '../../../../components/DockableFrame';


const DbView = () => {

    const ctx = Dockable.useContentContext();
    ctx.setTitle(`Database`);
    ctx.setPreferredSize(500, 500);

    return (
        <div id="DbViewPanel">
            Database View
        </div>
    );

}

export default DbView;