import React, { useState } from 'react';
import Board from './Board';
import { calculateWinner } from '../Who_winner';

import style from './Game.module.css';

const Game = () => {
	const [board, setBoard] = useState(Array(9).fill(null));
	const [isXNext, setIsXNext] = useState(true);
	const winner = calculateWinner(board);

	const handleClick = (index) => {
		const boardCopy = [...board];

		if (winner || boardCopy[index]) return;

		boardCopy[index] = isXNext ? 'X' : 'O';

		setBoard(boardCopy);
		setIsXNext(!isXNext);
	};

	const startNewGame = () => {
		return (
			<button
				className={style.Start_btn}
				onClick={() => {
					setBoard(Array(9).fill(null));
					setIsXNext(true);
				}}
			>
				Новоя игра
			</button>
		);
	};

	const who_winner = () => {
		if (winner) {
			return 'Победитель: ' + winner;
		} else if (!winner && board.includes(null)) {
			return 'Сейчас ходит: ' + (isXNext ? 'X' : 'O');
		} else if (!board.includes(null) && !winner) {
			return 'Ничья';
		}
	};

	return (
		<div className={style.wrapper}>
			{startNewGame()}
			<Board squares={board} click={handleClick} />
			<p className={style.text}>{who_winner()}</p>
		</div>
	);
};

export default Game;
