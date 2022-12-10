import React, { Fragment } from "react";
import * as styles from './ListEditView.module.css';

const StringView = (elm, index) => {
    return (
        <Fragment>
            <input name={`${index}-sub-str`} type="text" value={elm} />
            <button><i className="far fa-trash-alt"></i></button> 
        </Fragment>
    );
}

const ObjView = (elm, index) => {
    const props = Object.keys(elm);
    return (
        <div key={index} className={styles.listEditViewElm}>
            {props.map((e,i) => {
                if(typeof elm === "string") {
                    return (
                        <div key={index} className={styles.listEditViewElm}>
                            <span>{index}</span>
                            <StringView elm={e} index={`${index}-sub-${i}`} />
                        </div>
                    );
                }
                if(typeof elm === "object") {
                    return (
                        <div key={index} className={styles.listEditViewElm}>
                            <span>{index}</span>
                            <ObjView elm={e} index={`${index}-sub-${i}`} />
                        </div>
                    );
                }
            })}
        </div>
    );
}

const BaseView = ({elm, index}) => {
    switch(typeof elm) {
        case "string":
            return (
                <div key={`base-${index}`} className={styles.listEditViewElm}>
                    <span>{index}</span>
                    <StringView elm={elm} index={`base-sub-${index}`} />
                </div>
            );
        case "object":
            return (
                <div key={`base-${index}`} className={styles.listEditViewElm}>
                    <span>{index}</span>
                    <ObjView elm={elm} index={`base-sub-${index}`} />
                </div>
            );
        default:
            return (
                <div key={`base-${index}`} className={styles.listEditViewElm}>
                    <span>Error: {typeof elm} : {JSON.stringify(elm)}</span>
                </div>
            );
    }
}

const ListEditView = ({ data }) => {
    console.log('ListEditView data:', data);
    return (
        <div className={styles.ListEditView}>
            <div>
                {data.map((elm, index) => (
                    <Fragment>
                        <BaseView elm={elm} index={index} />
                    </Fragment>
                ))}
            </div>
            <button>+</button>
        </div>
    );
}

export default ListEditView;