import React from "react";

function Characters({el}) {
  return (
    <li>
      <img src={el?.image} alt="" />
      <div className="card__details">
        <p className="card__details--name">{el?.name}</p>
        <p className={`card__details--status ${el?.status === "Alive" ? "Alive" : "Dead"}`}>{el?.status} - {el?.species}</p>
        <p className="card__details--lastknown">
          <span>Last Know:</span>
          <span>{el?.location?.name}</span>
        </p>
        <p className="card__details--origin">
          <span>Origin:</span>
          <span>{el?.origin?.name}</span>
        </p>
      </div>
    </li>
  );
}

export default Characters;
