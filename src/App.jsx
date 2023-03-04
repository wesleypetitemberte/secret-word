//Styles
import "./_app.scss";

//Imports
import { useState, useCallback, useEffect } from "react";
import { wordsList } from "./data/words";

//Components
import StartScreen from "./components/StartScreen/StartScreen";

export default function App() {
    return (
        <div className="app">
            <StartScreen />
        </div>
    );
}
