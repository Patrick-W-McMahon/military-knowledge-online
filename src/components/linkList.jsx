import React, { Fragment } from "react";
import { abc } from '../libs/common';
import LinkCmp from "./linkCmp";

const LinkList = ({ links }) => (
    <Fragment>
        {links[0]?.links ? abc.map((a,i) => {
            const group = links.find(g => g.fieldValue === a);
            return (
                <details key={`link-${i}`} open>
                    <summary><b> - {a.toUpperCase()} - </b></summary>
                    {group ? group.links.map((link,index) => (
                        <LinkCmp key={index} link={link} />
                    )): <div>No data</div>}
                </details>
            );
        }) : links.map((link, index) => (
            <LinkCmp key={index} link={link} />
        ))}
    </Fragment>
);

export default LinkList;