import React, { useState, useEffect, useRef } from "react";
import Card from "../Card";
import classes from "./PlayArea.module.css";
import axios from "../../utils/axios";
import Timer from "../Timer";

function PlayArea({ file_id, numCards, onGameOver }) {
  const currentTime = useRef();
  const [isTimerStarted, setIstimerStarted] = useState(false);

  function findAllIndex(array) {
    return array.reduce(function (a, e, i) {
      if (e.open) a.push(i);
      return a;
    }, []);
  }

  const [cardsArray, setCardsArray] = useState(
    Array(numCards).fill({ open: false, matched: false, face: {} })
  );

  const [errorCount, setErrorCount] = useState(0);

  function handleCardOpen(index) {
    if (!isTimerStarted) {
      setIstimerStarted(true);
      currentTime.current = new Date().getTime();
    }
    let openCount = cardsArray.filter((el) => el.open).length;
    if (openCount > 1) return false;

    let cardsList = [...cardsArray];
    let selectedItem = { ...cardsList[index] };

    if (Object.keys(selectedItem.face).length > 0) {
      selectedItem.open = !selectedItem.open;
      cardsList[index] = selectedItem;
      setCardsArray(cardsList);
      return;
    }

    axios
      .post("/open-card-face", {
        file_id,
        index,
      })
      .then((res) => {
        selectedItem.face = res;
        selectedItem.open = !selectedItem.open;
        cardsList[index] = selectedItem;
        setCardsArray(cardsList);
      })
      .catch(console.error);
  }

  useEffect(() => {
    if (cardsArray.filter((el) => el.open).length === 2) {
      const [first, second] = findAllIndex(cardsArray);
      const { face: firstCard } = cardsArray[first];
      const { face: secondCard } = cardsArray[second];

      setTimeout(() => {
        if (
          firstCard.suite === secondCard.suite &&
          firstCard.rank === secondCard.rank
        ) {
          setCardsArray((state) =>
            state.map((item, inx) => ({
              ...item,
              open: false,
              matched: item.matched ? true : inx === first || inx === second,
            }))
          );
        } else {
          setErrorCount((state) => state + 1);
          setCardsArray((state) =>
            state.map((item) => ({ ...item, open: false }))
          );
        }
      }, 3000);
    }
  }, [cardsArray]);

  useEffect(() => {
    if (cardsArray.filter((el) => !el.matched).length === 0) {
      // every card is matched, game over
      axios
        .post("/game-over", {
          file_id,
        })
        .then((res) => {
          onGameOver({
            errorCount,
            timeElapsed: new Date().getTime() - currentTime.current,
          });
        })
        .catch(console.error);
    }
  }, [cardsArray]);

  return (
    <>
      <Timer
        isTimerStarted={isTimerStarted}
        startTimer={currentTime.current}
        errorCount={errorCount}
      />
      <div className={classes.playArea}>
        {cardsArray.map((card, inx) => (
          <Card
            key={inx}
            index={inx}
            handleCardOpen={handleCardOpen}
            file_id={file_id}
            {...card}
          />
        ))}
      </div>
    </>
  );
}

export default PlayArea;
