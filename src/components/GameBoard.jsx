import React, { useState, useEffect } from "react";
import Snake from "./Snake";
import Food from "./Food";

const getRandomCoordinates = () => {
  const x = Math.floor(Math.random() * 20) * 20;
  const y = Math.floor(Math.random() * 20) * 20;
  return [x, y];
};

const GameBoard = () => {
  const [snakeDots, setSnakeDots] = useState([
    [0, 0],
    [20, 0],
  ]);
  const [food, setFood] = useState(getRandomCoordinates());
  const [direction, setDirection] = useState("RIGHT");
  const [speed, setSpeed] = useState(200);

  const moveSnake = () => {
    let dots = [...snakeDots];
    let head = dots[dots.length - 1];

    switch (direction) {
      case "RIGHT":
        head = [head[0] + 20, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 20, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 20];
        break;
      case "UP":
        head = [head[0], head[1] - 20];
        break;
      default:
        break;
    }

    dots.push(head);
    dots.shift();
    setSnakeDots(dots);
  };

  const checkIfOutOfBounds = () => {
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] >= 400 || head[0] < 0 || head[1] >= 400 || head[1] < 0) {
      alert("Game Over!");
      resetGame();
    }
  };

  const checkIfCollapsed = () => {
    let snake = [...snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        alert("Game Over!");
        resetGame();
      }
    });
  };

  const checkIfEat = () => {
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] === food[0] && head[1] === food[1]) {
      setFood(getRandomCoordinates());
      enlargeSnake();
      increaseSpeed();
    }
  };

  const enlargeSnake = () => {
    let newSnake = [...snakeDots];
    newSnake.unshift([]);
    setSnakeDots(newSnake);
  };

  const increaseSpeed = () => {
    if (speed > 10) {
      setSpeed(speed - 10);
    }
  };

  const resetGame = () => {
    setSnakeDots([
      [0, 0],
      [20, 0],
    ]);
    setFood(getRandomCoordinates());
    setDirection("RIGHT");
    setSpeed(200);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          setDirection("UP");
          break;
        case "ArrowDown":
          setDirection("DOWN");
          break;
        case "ArrowLeft":
          setDirection("LEFT");
          break;
        case "ArrowRight":
          setDirection("RIGHT");
          break;
        default:
          break;
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      moveSnake();
      checkIfOutOfBounds();
      checkIfCollapsed();
      checkIfEat();
    }, speed);

    return () => clearInterval(interval);
  });

  return (
    <div className="game-board">
      <Snake snakeDots={snakeDots} />
      <Food dot={food} />
    </div>
  );
};

export default GameBoard;
