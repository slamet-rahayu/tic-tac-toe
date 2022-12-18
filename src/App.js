import { useEffect, useState } from "react";
import cx from 'classnames';

function App() {
  const [red, setRed] = useState([]);
  const [blue, setBlue] = useState([]);
  const [winner, setWinner] = useState('');
  const [draw, setDraw] = useState(false);
  
  const sq = [1,2,3,4,5,6,7,8,9];

  const winPattern = [
    [1,2,3],[4,5,6],[7,8,9],
    [1,4,7],[1,5,9],[7,5,3],
    [2,5,8],[3,6,9]
  ];
  
  const isWin = (arr) => 
  !!winPattern.map((p) => {
    return p.map((m) => {
      return arr.find((e) => e === m);
    }).filter((e) => e)
  }).filter((e) => e.length > 2)[0];

  const handleClickBtn = (v) => {
    const foundRed = red.find((e) => e === v);
    const foundBlue = blue.find((e) => e === v);
    if (!winner || draw) {
      // if (!foundRed && red.length < 9) {
      //   setRed((prev) => [...prev, v]);
      // }
      if (red.length <= blue.length) {
        if (!foundRed) {
          setRed((prev) => [...prev, v]);
        }
      } else {
        if (!foundRed) {
          setBlue((prev) => [...prev, v]);
        }
      }
    }
  }

  useEffect(()=> {
    if (red.length > 0) {
      const available = sq.filter((e) => {
        return ![...red, ...blue].includes(e);
      })
      const rand = Math.floor(Math.random() * available.length);
      const sBlue = available[rand];
      if (sBlue) {
        setBlue((prev) => [...prev, sBlue]);
      }
    }
  }, [red])

  useEffect(() => {
    if (blue.length > 0) {
      const isBlueWin = isWin(blue);
      if (isBlueWin) {
        setWinner('Blue')
      }
    }
    if (red.length > 0) {
      const isRedWin = isWin(red);
      if (isRedWin) {
        setWinner('Red')
      }
    }
    if ([...red, ...blue].length > 8 && !winner) {
      setDraw(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [red, blue])

  return (
    <div className="App flex flex-col justify-center items-center bg-slate-600 w-screen h-screen">
      <div className="font-semibold text-white mb-5 text-3xl">{winner} win!</div>
      <div className="rounded-xl bg-slate-700 grid grid-rows-3 grid-flow-col p-1">
        {sq.map((v) => {
          const cRed = red.find((e) => e === v);
          const cBlue = blue.find((e) => e === v);
          return (
            <button 
              type="button" 
              key={v} 
              onClick={() => handleClickBtn(v)}
              className={cx(
                "w-20", 
                "h-20", 
                cRed ? "bg-red-500" : cBlue ? "bg-blue-500" : "bg-slate-500",
                "m-1", 
                "rounded-xl"
            )}>{v}</button>
          )
        })}
      </div>
    </div>
  );
}

export default App;
