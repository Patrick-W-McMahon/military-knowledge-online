import React, { Fragment } from "react";
import * as Dockable from '../../../../components/DockableFrame';

const Wrapper = ({children}) => <div id="InspectorPanel">{children}</div>;
const Inspector = (props) => {
    const { selectedObj } = props;
    const ctx = Dockable.useContentContext();
    ctx.setTitle(`Inspector`);
    ctx.setPreferredSize(200, 250);
    console.log("Inspector props: ", props);

    /*
    switch(selectedItemId) {
        default:*/
            //return <Wrapper><p>Selected Object not supported</p></Wrapper>;
    //}
    if(selectedObj === null) {
        return (
            <Wrapper>
                <div>No object selected</div>
            </Wrapper>
        );
    }

    switch(selectedObj.hash) {
        case "list_people":
            return (
                <Wrapper>
                    <Fragment>
                        <div>show people list with the ability to add people</div>
                    </Fragment>
                </Wrapper>
            );
        default:
            return (
                <Wrapper>
                    <Fragment>
                        <div>unsupported object type</div>
                    </Fragment>
                </Wrapper>
            );
    }

    

}

export default Inspector;