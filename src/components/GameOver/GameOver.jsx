//Styles
import "./_game-over.scss";

export default function GameOver({ retry, score }) {
    return (
        <section className="game-over">
            <h1>GAMEOVER</h1>
            <h2>
                A sua pontuação foi: <span>{score}</span>
            </h2>
            <button onClick={retry}>Restart</button>
        </section>
    );
}
