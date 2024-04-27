import React, { Fragment } from "react";
import * as Dockable from '../../../../components/DockableFrame';
import personTemplate from '../../templates/personTemplate.json';
import InsArrCmp from "../InsArrCmp";

const Wrapper = ({children}) => <div id="InspectorPanel">{children}</div>;
const Inspector = (props) => {
    const { selectedObj } = props;
    const ctx = Dockable.useContentContext();
    ctx.setTitle(`Inspector`);
    ctx.setPreferredSize(200, 250);
    console.log("Inspector props: ", props);
    
    const getDataTemplate = (template) => {
        switch(template) {
            case "person": 
                return personTemplate;
            default:
                return {err: 'not supported template'};
        }
    }

    /*
    switch(selectedItemId) {
        default:*/
            //return <Wrapper><p>Selected Object not supported</p></Wrapper>;
    //}
    if(selectedObj === null || selectedObj.inspectorStr === null) {
        return (
            <Wrapper>
                <div>No object selected</div>
            </Wrapper>
        );
    }
    const { inspectorStr } = selectedObj;
    const iType = inspectorStr.split('<')[0];
    const iObj = (inspectorStr.split('<')[1]).split('>')[0];
    const iTemplate = (inspectorStr.split('<')[1]).split('>')[1];
    console.log('data str: ', iType, iObj, iTemplate);
    //const templateData = getDataTemplate(iTemplate);
    
    const testData = [
        {
            _internal: {
                label: "person 1",
                type: "person"
            }
            
        }
    ];
    

    switch(iType) {
        case "array":
            return (
                <Wrapper>
                    <h1><span>{iObj.charAt(0).toUpperCase() + iObj.slice(1)}</span></h1>

                    <InsArrCmp title={iObj} data={testData} />

                    {/*
                    <div className="array-list-view">
                        <h2>{iObj.charAt(0).toUpperCase() + iObj.slice(1)}</h2>
                        <Table>

                        </Table>
                        <Button variant="secondary" size={'sm'}>New {iTemplate.charAt(0).toUpperCase() + iTemplate.slice(1)}</Button>
                    </div>
                    */}
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