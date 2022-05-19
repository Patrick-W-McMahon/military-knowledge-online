import React, { Fragment } from "react";
import LinkCard from "./linkCard";

const CardGrid = ({ cards }) => (
    <Fragment>
        {cards.map((card, index) => <LinkCard key={`card-${index}`} card={card} />)}
    </Fragment>
);

export default CardGrid;