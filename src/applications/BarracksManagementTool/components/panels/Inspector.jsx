import React, { Fragment } from "react";
import * as Dockable from '../../../../components/DockableFrame';
import personTemplate from '../../templates/personTemplate.json';
import unitTemplate from '../../templates/unitTemplate.json';
import buildingTemplate from '../../templates/buildingTemplate.json';
import InsArrCmp from "../InsArrCmp";
import InsFormCmp from "../InsFormCmp";

const Wrapper = ({children}) => <div id="InspectorPanel">{children}</div>;
const Inspector = (props) => {
    const { selectedObj, createNewInsObj, buildings, people, units } = props;
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
    let selectedData = [];
    let objectMap = null;
    switch(inspectorStr) {
        case "array<people>person":
            selectedData = people;
            objectMap = personTemplate;
        break;
        case "array<units>unit":
            selectedData = units;
            objectMap = unitTemplate.objectMapping;
        break;
        case "array<buildings>building":
            selectedData = buildings;
            objectMap = buildingTemplate;
        break;
        default:
            selectedData = null;
    }

    switch(iType) {
        case "array":
            return (
                <Wrapper>
                    <header><span>{iObj.charAt(0).toUpperCase() + iObj.slice(1)}</span></header>

                    <InsArrCmp title={iObj} data={selectedData} onNew={() => createNewInsObj({})} />
                    <InsFormCmp title={iTemplate} objectMap={objectMap} onSubmit={createNewInsObj} />

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