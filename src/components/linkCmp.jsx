import React from "react";

const LinkCmp = ({ link }) => {
    const { url, title, description } = link;
    return (  
        <details>
            <summary><a rel="noreferrer" target="_blank" href={url}>{title}</a></summary>
            <p>{description}</p>
        </details>
    );
}

export default LinkCmp;