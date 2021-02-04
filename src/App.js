import { useState } from 'react';
import { uniq, updatecows, updatebulls, lives_left } from './game';
import './App.css';

function App() {
  const [secret, _setSecret] = useState(generateSecret);
  const [guesses, setGuesses] = useState([]);
  const [guess, setGuess] = useState("");
  const [cows, setCows] = useState(0);
  const [bulls, setBulls] = useState(0);
  const [apperror, setError] = useState("");

  //Cow values for each round
  const [r1, setr1] = useState("");
  const [r2, setr2] = useState("");
  const [r3, setr3] = useState("");
  const [r4, setr4] = useState("");
  const [r5, setr5] = useState("");
  const [r6, setr6] = useState("");
  const [r7, setr7] = useState("");
  const [r8, setr8] = useState("");

  let bads = guesses;
  let lives = lives_left(secret, guesses);

  function updateGuess(ev) {
    let text = ev.target.value;
    if (text.length < 5) {
      setGuess(text);
    }
  }

  function generateSecret() {
    var tsecret = 1111;
    while (isUnique(tsecret.toString()) == false) {
      tsecret = Math.floor(1000 + Math.random() * 9000);
    }
    return tsecret;
  }

  function isUnique(val) {
    let seen = new Array(0);
    var i;
    for (i = 0; i < val.length; i++) {
      if (!seen.includes(val.charAt(i))) {
        seen[i] = val.charAt(i);
      } else {
        return false;
      }
    }
    return true;
  }

  function setRoundVal(c, b) {
    let result = guess + " C" + c + " B" + b;
    switch (lives){
      case 8:
        setr1(result);
        break;
      case 7:
        setr2(result);
        break;
      case 6:
        setr3(result);
        break;
      case 5:
        setr4(result);
        break;
      case 4:
        setr5(result);
        break;
      case 3:
        setr6(result);
        break;
      case 2:
        setr7(result);
        break;
      case 1:
        setr8(result);
        break;
    }
  }

  function makeGuess() {
    if (guess.length == 4 && isUnique(guess)){
      setCows(updatecows(secret, guess));
      setBulls(updatebulls(secret, guess));
      setRoundVal(updatecows(secret, guess), updatebulls(secret, guess));
      setGuesses(uniq(guesses.concat(guess)));
      setGuess("");
    } else {
      setError("Entries must be 4 characters and unique");
    }
  }

  function keypress(ev) {
    if (apperror != "") {
      setError("");
    }
    if (ev.key == "Enter") {
      makeGuess();
    }
  }

  function reset(){
    setGuesses([]);
    _setSecret(generateSecret);
    setGuess("");
    setCows(0);
    setBulls(0);
    setr1("");
    setr2("");
    setr3("");
    setr4("");
    setr5("");
    setr6("");
    setr7("");
    setr8("");
  }

  if (lives <= 0) {
    return (
      <div className="App">
        <h1>4digits</h1>
        <h2>You lost. The secret was {secret}</h2>
        <h2>Guesses:</h2>
        <h3>Round 1: {r1}</h3>
        <h3>Round 2: {r2}</h3>
        <h3>Round 3: {r3}</h3>
        <h3>Round 4: {r4}</h3>
        <h3>Round 5: {r5}</h3>
        <h3>Round 6: {r6}</h3>
        <h3>Round 7: {r7}</h3>
        <h3>Round 8: {r8}</h3>
        <p>
          <button onClick={() => reset()}>
            Reset
          </button>
        </p>
      </div>
    );
  }

  if (bulls == 4) {
    return (
      <div className="App">
        <h1>4digits</h1>
        <h2>You win! The secret was {secret}.</h2>
        <h2>Guesses:</h2>
        <h3>Round 1: {r1}</h3>
        <h3>Round 2: {r2}</h3>
        <h3>Round 3: {r3}</h3>
        <h3>Round 4: {r4}</h3>
        <h3>Round 5: {r5}</h3>
        <h3>Round 6: {r6}</h3>
        <h3>Round 7: {r7}</h3>
        <h3>Round 8: {r8}</h3>
        <p>
          <button onClick={() => reset()}>
            Reset
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="App">
      <h1 id="title">4digits</h1>
      <h2>Lives: {lives}</h2>
      <h2>Guesses:</h2>
      <h3>Round 1: {r1}</h3>
      <h3>Round 2: {r2}</h3>
      <h3>Round 3: {r3}</h3>
      <h3>Round 4: {r4}</h3>
      <h3>Round 5: {r5}</h3>
      <h3>Round 6: {r6}</h3>
      <h3>Round 7: {r7}</h3>
      <h3>Round 8: {r8}</h3>

      <h4>{apperror}</h4>
      <p>
        <input type="number"
               value={guess}
               onChange={updateGuess}
               onKeyPress={keypress} />
        <button onClick={makeGuess}>
          Guess
        </button>
      </p>
      <p>
        <button onClick={() => reset()}>
          Reset
        </button>
      </p>
    </div>
  );
}

export default App;
