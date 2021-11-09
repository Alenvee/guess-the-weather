import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState("");
  const [cityTemp, setCityTemp] = useState(0);
  const [guessNumber, setGuessNumber] = useState("");
  const [attempts, setAttempts] = useState(5);
  const [rightAnswers, setRightAnswers] = useState(0);
  const [result, setResult] = useState([]);
  const cityList = ["Tirana", "Yerevan", "Sofia", "Ottawa", "Cairo", "Paris", "Merlo", "Mendoza", "Hanna", "Trenzano", "Battuda", "Sommo", "Chieve"]

  useEffect(() => {
    let randomCity = cityList[Math.floor(Math.random()*cityList.length)]
    if(!city) {
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${randomCity}&units=metric&appid=9cff733aee57cb05b63dd4f731c46bc4`)
        .then(response => response.json())
        .then(data => {
          setCity(data.name)
          setCityTemp(data.main.temp)
        });
    }
  }, [city]);

  function handleChange(event) {
    setGuessNumber(event.target.value);
  }

  function handleSubmit() {
    let isWin = cityTemp >= +guessNumber - 5 && cityTemp <= +guessNumber + 5
    let newResult = [...result, {city: city, guessNumber: guessNumber, cityTemp: cityTemp, isWin: isWin}]
    setResult(newResult)
    setCity("")
    setAttempts(attempts - 1)
    if(isWin) setRightAnswers(rightAnswers + 1)
  }

  return (
    <div>
      <p>Guess the temperature in degrees Celsius in the following city:</p>
      <h3>{city}</h3>
      <p>Attempts left: {attempts}</p>
      {attempts <= 0 ? (rightAnswers >=3 ? "You win" : "You lost") : null}
      <form>
      <label>
        Your guess
        <input type="number" name="name" onChange={handleChange} />
      </label>
      <input type="button" onClick={handleSubmit} value="Check"/>
      {result?.map(el => {
        return (
          <div key={el.city}>
            <p>City: {el.city}</p>
            <p className={el.isWin ? "green" : "red"}>Your guess: {el.guessNumber}</p>
            <p>Answer: {el.cityTemp}</p>
          </div>
        )
      })}
    </form>
    </div>
  );
}

export default App