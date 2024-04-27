import React, { Fragment} from "react";
import InsCmpBase from "./InsCmpBase";

const InsArrCmp = ({ title, data }) => {
    return (
        <InsCmpBase title={title}>
            <Fragment>
                <ul>
                    {data.map((d,i) => (
                        <li key={i}>{d._internal.label}</li>
                    ))}
                </ul>
                <div className="btn-group">
                    <button>+</button>
                    <button>-</button>
                </div>
            </Fragment>
        </InsCmpBase>
    );
}

export default InsArrCmp;