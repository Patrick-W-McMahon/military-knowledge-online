import * as React from "react";
import * as Dockable from "@hlorenzi/react-dockable";


const Inspector = () => {

    const ctx = Dockable.useContentContext();
    ctx.setTitle(`Inspector`);
    ctx.setPreferredSize(200, 250);

    return (
        <div id="InspectorPanel">
            Inspector
        </div>
    );

}

export default Inspector;