import React, { Fragment } from "react";
import LinkCard from "./linkCard";

const CardGrid = ({ cards, showInfo, editMode, toggleFav, classProps }) => (
    <Fragment>
        {cards.length && cards.map((card, index) => (
            <LinkCard key={`card-${index}`} card={card} showInfo={showInfo} editMode={editMode} toggleFav={toggleFav} classProps={classProps} />
        ))}
    </Fragment>
);

export default CardGrid;