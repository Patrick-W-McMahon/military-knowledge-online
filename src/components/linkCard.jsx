import React from "react";

const LinkCard = ({ card, showInfo }) => {
    const { title, url, description, cardId } = card;
    const cardIdStr = String(cardId).padStart(3, '0');
    return (
        <div className="card">
            <a rel="noreferrer" target="_blank" href={url}>
                <img src={`/img/cards/Card-${cardIdStr}.png`} alt={title} />
            </a>
            <div className="card-body">
                <h5 className="card-title">
                    <a rel="noreferrer" target="_blank" href={url}>{title}</a>
                    <button onClick={() => showInfo({ title, url, description, cardId })}>INFO</button>
                </h5>
                <p className="card-text hidden">{description}</p>
            </div>
        </div>
    );
};

export default LinkCard;