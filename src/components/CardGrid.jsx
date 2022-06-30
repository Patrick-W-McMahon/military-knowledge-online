import React, { Fragment } from "react";
import LinkCard from "./linkCard";

const CardGrid = ({ cards, showInfo }) => (
    <Fragment>
        {cards.map((card, index) => <LinkCard key={`card-${index}`} card={card} showInfo={showInfo} />)}
    </Fragment>
);

export default CardGrid;