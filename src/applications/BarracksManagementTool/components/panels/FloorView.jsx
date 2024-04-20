import * as React from "react";
import * as Dockable from "@hlorenzi/react-dockable";


const FloorView = () => {

    const ctx = Dockable.useContentContext();
    ctx.setTitle(`FloorView`);
    ctx.setPreferredSize(500, 500);

    return (
        <div id="FloorViewPanel">
            Floor view panel
        </div>
    );

}

export default FloorView;