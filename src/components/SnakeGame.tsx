import React, { useState, useEffect, useCallback, useRef } from 'react';

const GRID_SIZE = 20;
const CELL_SIZE = 18;

export default function SnakeGame({ onScoreUpdate }: { onScoreUpdate: (score: number) => void }) {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState({ x: 0, y: -1 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const gameLoopRef = useRef<number>();

  const resetGame = useCallback(() => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 5, y: 5 });
    setDirection({ x: 0, y: -1 });
    setGameOver(false);
    setScore(0);
    onScoreUpdate(0);
  }, [onScoreUpdate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction.y === 0) setDirection({ x: 0, y: -1 }); break;
        case 'ArrowDown': if (direction.y === 0) setDirection({ x: 0, y: 1 }); break;
        case 'ArrowLeft': if (direction.x === 0) setDirection({ x: -1, y: 0 }); break;
        case 'ArrowRight': if (direction.x === 0) setDirection({ x: 1, y: 0 }); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (gameOver) return;

    const gameLoop = () => {
      setSnake(prev => {
        const newSnake = [...prev];
        const head = { ...newSnake[0] };
        head.x += direction.x;
        head.y += direction.y;

        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE || newSnake.some(s => s.x === head.x && s.y === head.y)) {
          setGameOver(true);
          return prev;
        }

        newSnake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
          setFood({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) });
          setScore(s => {
            const newScore = s + 10;
            onScoreUpdate(newScore);
            return newScore;
          });
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    gameLoopRef.current = window.setInterval(gameLoop, 150);
    return () => clearInterval(gameLoopRef.current);
  }, [direction, food, gameOver, onScoreUpdate]);

  return (
    <div className="bg-[#151619] p-4 rounded-xl border border-zinc-800 shadow-2xl">
      <div className="relative border border-zinc-700 bg-black" style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }}>
        {snake.map((cell, i) => (
          <div key={i} className="absolute bg-green-500" style={{ width: CELL_SIZE, height: CELL_SIZE, left: cell.x * CELL_SIZE, top: cell.y * CELL_SIZE }} />
        ))}
        <div className="absolute bg-red-500" style={{ width: CELL_SIZE, height: CELL_SIZE, left: food.x * CELL_SIZE, top: food.y * CELL_SIZE }} />
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 text-red-500">
            <p className="font-mono text-xl font-bold">GAME OVER</p>
            <button onClick={resetGame} className="mt-4 px-4 py-2 border border-zinc-600 hover:bg-zinc-800 font-mono text-sm">RESTART</button>
          </div>
        )}
      </div>
    </div>
  );
}
