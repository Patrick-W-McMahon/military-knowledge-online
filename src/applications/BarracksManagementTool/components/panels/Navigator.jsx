import * as React from "react";
import * as Dockable from "@hlorenzi/react-dockable";


const Navigator = () => {

    const ctx = Dockable.useContentContext();
    ctx.setTitle(`Navigator`);
    ctx.setPreferredSize(200, 250);

    return (
        <div id="NavigatorPanel">
            NavigatorPanel
        </div>
    );

}

export default Navigator;