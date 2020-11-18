import React, { useRef, useState } from "react";
import classes from "./Card.module.css";
import heart from "../../assets/images/heart.svg";
import spades from "../../assets/images/spade.svg";
import diamond from "../../assets/images/diamond.svg";
import club from "../../assets/images/club.svg";

const IMAGES = {
  heart,
  spades,
  diamond,
  club,
};

function Card({ index, file_id, handleCardOpen, open, matched, face }) {
  const cardRef = useRef();

  return (
    <div
      ref={cardRef}
      onClick={() => {
        if (matched) return false;
        handleCardOpen(index);
      }}
      className={`${classes.card} ${
        matched ? classes.matched : open ? "" : classes.masked
      }`}
    >
      <img src={IMAGES[face.suite?.toLowerCase()]} alt="heart" />
      <span>{face.rank}</span>
    </div>
  );
}

export default Card;
