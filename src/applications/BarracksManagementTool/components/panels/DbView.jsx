import * as React from "react";
import * as Dockable from "@hlorenzi/react-dockable";


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