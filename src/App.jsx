//Imports
import { useCallback, useEffect, useState } from "react";

//Components
import StartScreen from "./components/StartScreen/StartScreen";
import Game from "./components/Game/Game";
import GameOver from "./components/GameOver/GameOver";

//Styles
import "./_app.scss";

//Data
import { wordsList } from "./data/words";

const stages = [
    { id: 1, name: "start" },
    { id: 2, name: "game" },
    { id: 3, name: "end" },
];

export default function App() {
    const [gameStage, setGameStage] = useState(stages[0].name);
    const [words] = useState(wordsList);

    const [getedWord, setgetedWord] = useState("");
    const [getedCategory, setgetedCategory] = useState("");
    const [letters, setLetters] = useState([]);

    const [guessedLetters, setGuessedLetters] = useState([]);
    const [wrongLetters, setWrongLetters] = useState([]);
    const [guesses, setGuesses] = useState(3);
    const [score, setScore] = useState(0);

    const getWordAndCategory = useCallback(() => {
        // get a random category
        const categories = Object.keys(words);
        const category =
            categories[
                Math.floor(Math.random() * Object.keys(categories).length)
            ];

        // get a random word
        const word =
            words[category][Math.floor(Math.random() * words[category].length)];

        return { category, word };
    }, [words]);

    // start the game
    const startGame = useCallback(() => {
        // clear all letters
        clearLettersStates();

        // choose a word
        const { category, word } = getWordAndCategory();

        let wordLetters = word.split("");

        wordLetters = wordLetters.map((l) => l.toLowerCase());

        setgetedCategory(category);
        setgetedWord(word);
        setLetters(wordLetters);

        setGameStage(stages[1].name);
    }, [getWordAndCategory]);

    // process letter input
    const verifyLetter = (letter) => {
        const normalizedLetter = letter.toLowerCase();

        // check if letter has already been utilized
        if (
            guessedLetters.includes(normalizedLetter) ||
            wrongLetters.includes(normalizedLetter)
        ) {
            return;
        }

        // push guessed letter or remove a chance
        if (letters.includes(normalizedLetter)) {
            setGuessedLetters((actualGuessedLetters) => [
                ...actualGuessedLetters,
                letter,
            ]);
        } else {
            setWrongLetters((actualWrongLetters) => [
                ...actualWrongLetters,
                normalizedLetter,
            ]);

            setGuesses((actualGuesses) => actualGuesses - 1);
        }
    };

    // restart the game
    const retry = () => {
        setScore(0);
        setGuesses(3);
        setGameStage(stages[0].name);
    };

    // clear letters state
    const clearLettersStates = () => {
        setGuessedLetters([]);
        setWrongLetters([]);
    };

    // check if guesses ended
    useEffect(() => {
        if (guesses === 0) {
            // game over and reset all states
            clearLettersStates();

            setGameStage(stages[2].name);
        }
    }, [guesses]);

    // check win condition
    useEffect(() => {
        const uniqueLetters = [...new Set(letters)];

        // win condition
        if (guessedLetters.length === uniqueLetters.length) {
            // add score
            setScore((actualScore) => (actualScore += 100));

            // restart game with new word
            startGame();
        }
    }, [guessedLetters, letters, startGame]);

    return (
        <div className="app">
            {gameStage === "start" && <StartScreen startGame={startGame} />}
            {gameStage === "game" && (
                <Game
                    verifyLetter={verifyLetter}
                    getedWord={getedWord}
                    getedCategory={getedCategory}
                    letters={letters}
                    guessedLetters={guessedLetters}
                    wrongLetters={wrongLetters}
                    guesses={guesses}
                    score={score}
                />
            )}
            {gameStage === "end" && <GameOver retry={retry} score={score} />}
        </div>
    );
}
