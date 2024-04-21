import * as React from "react";
//import * as Dockable from "@hlorenzi/react-dockable";
import * as Dockable from '../../../../components/DockableFrame';

const Wrapper = ({children}) => <div id="InspectorPanel">{children}</div>;
const Inspector = ({ selectedObjHash }) => {

    const ctx = Dockable.useContentContext();
    ctx.setTitle(`Inspector`);
    ctx.setPreferredSize(200, 250);

    /*
    switch(selectedItemId) {
        default:*/
            //return <Wrapper><p>Selected Object not supported</p></Wrapper>;
    //}
    return (<Wrapper>{selectedObjHash}</Wrapper>);

}

export default Inspector;