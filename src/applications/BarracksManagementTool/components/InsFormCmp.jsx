import React, { Fragment} from "react";
import InsCmpBase from "./InsCmpBase";

const InsFormCmp = ({ title, objectMap, mode }) => {
    if(objectMap === null) {
        return (
            <InsCmpBase title={title}>
                <span>Error Object Map is null</span>
            </InsCmpBase>
        );
    }
    const handleFormSubmit = e => {
        e.preventDefault();
        console.log('submit');
    }
    const formatFieldName = str => str.charAt(0).toUpperCase() + str.slice(1).replace(/([A-Z])/g, ' $1').trim()
    const objKeys = Object.keys(objectMap);
    console.log('objectMap: ', objKeys);
    return (
        <InsCmpBase title={title}>
            <form>
                {objKeys.map((objKey, i) => {
                    console.log(objKey,': ',objectMap[objKey].type);
                    switch(objectMap[objKey].type) {
                        case "string":
                            return (
                                <Fragment>
                                    <label>
                                        <span>{formatFieldName(objKey)}</span>
                                        <input key={i} type="string" name={objKey} />
                                    </label>
                                </Fragment>
                            );
                        case "number":
                            return (
                                <Fragment>
                                    <label>
                                        <span>{formatFieldName(objKey)}</span>
                                        <input key={i} type="number" name={objKey} />
                                    </label>
                                </Fragment>
                            );
                        case "bigint":
                            return (
                                <Fragment>
                                    <label>
                                        <span>{formatFieldName(objKey)}</span>
                                        <input key={i} type="number" name={objKey} />
                                    </label>
                                </Fragment>
                            );
                        case "date":
                            return (
                                <Fragment>
                                    <label>
                                        <span>{formatFieldName(objKey)}</span>
                                        <input key={i} type="date" name={objKey} />
                                    </label>
                                </Fragment>
                            );
                        case "select":
                            return (
                                <Fragment>
                                    <label>
                                        <span>{formatFieldName(objKey)}</span>
                                        <select>{objectMap[objKey]?.options?.map((oElm, oIndex) => <option key={oIndex} value={oElm}>{oElm}</option>)}</select>
                                    </label>
                                    
                                </Fragment>
                            );
                        case "object":
                            return (
                                <InsCmpBase title={formatFieldName(objKey)}>
                                    <Fragment>
                                        <div>object props</div>
                                    </Fragment>
                                </InsCmpBase>
                            );
                        case "boolean":
                            return (
                                <Fragment>
                                    <label>
                                        <span>{formatFieldName(objKey)}</span>
                                        <input type="checkbox" name={objKey} />
                                    </label>
                                </Fragment>
                            );
                        case "symbol":
                        case "undefined":
                        case "function":
                        default:
                            console.log('unknown type: ', objectMap[objKey].type);
                            return (
                                <label>
                                    <span>{formatFieldName(objKey)}</span>
                                    <div className="input-obj-error">Unknown type: {objectMap[objKey].type}</div>
                                </label>
                                
                            );
                    }
                    
                })}
                <button type="submit" onClick={handleFormSubmit}>{mode === "update" ? `Update ${title}` : `Create New ${title}`}</button>
            </form>
        </InsCmpBase>
    );
}

export default InsFormCmp;