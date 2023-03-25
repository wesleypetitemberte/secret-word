//S tyles
import "./_start-screen.scss";

export default function StartScreen({ startGame }) {
    return (
        <section className="start">
            <h1>Secret Word</h1>
            <p>Clique no botão abaixo para jogar!</p>
            <button onClick={startGame}>JOGAR</button>
        </section>
    );
}
