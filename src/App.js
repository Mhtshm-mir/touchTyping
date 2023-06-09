import React, { useEffect, useState } from "react";
import "./App.css";

const shuffleArray = (array) => {
  let shuffledArr = [...array];
  for (let i = shuffledArr.length - 1; i > 0; i--) {
    const randomIndex = (Math.floor(Math.random() * i + 1)[
      (shuffledArr[i], shuffledArr[randomIndex])
    ] = [shuffledArr[randomIndex], shuffledArr[i]]);
  }
  return shuffledArr;
};

function App() {
  const [arr, setArr] = useState([]);
  let [index, setIndex] = useState(0);
  let [time, setTime] = useState(0);
  let [mistakes, setMistakes] = useState(0);
  let [intervalStart, setIntervalStart] = useState(false);
  const [redBackground, setRedBackground] = useState(false);
  const [isFirstInputChange, setIsFirstInputChange] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [accuracy, setAccuracy] = useState(null);
  const [wpm, setWpm] = useState(null);
  const [newIteration, setNewIteration] = useState(true);
  useEffect(() => {
    if (newIteration) {
      setNewIteration(false);
      setIndex(0);
      setTime(0);
      setMistakes(0);
      setIntervalStart(false);
      setRedBackground(false);
      setIsFirstInputChange(true);
      setInputValue("");
      setAccuracy(null);
      setWpm(null);
      let array = ["ab cd ef gh ij kl, mn"];
      const shuffle = shuffleArray(array);
      setArr(shuffle);
    }
  }, [newIteration]);

  const handleChange = (e, arr) => {
    console.log(arr);
    const value = e.target.value;
    if (isFirstInputChange) {
      setIntervalStart(true);
      setIsFirstInputChange(false);
    }
    if (value[index] === arr[0][index]) {
      setInputValue(value);
      setIndex(index + 1);
      setRedBackground(false);
    } else {
      setRedBackground(true);
      setMistakes(mistakes + 1);
    }
  };
  useEffect(() => {
    let id;
    console.log(arr);
    if (intervalStart) {
      setIntervalStart(false);
      id = setInterval(() => {
        setTime((prevtime) => prevtime + 1);
      }, 1000);
    } else if (index == arr[0].length) {
      console.log(time, mistakes);
      setWpm(Math.trunc((arr[0].length / time) * (60 / 5)));
      setAccuracy(Math.trunc((1 - mistakes / arr[0].length) * 100));
      clearInterval(id);
      setNewIteration(true);
    }
  }, [index, intervalStart]);
  return (
    <div className={redBackground ? "redBackground" : ""}>
      <h1>{arr}</h1>
      <input type="text" value={inputValue} onChange={handleChange} />
      <p>Accuracy: {accuracy}%</p>
      <p>WPM: {wpm}</p>
    </div>
  );
}

export default App;
