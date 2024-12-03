import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [hours, setHours] = useState<number>(0);
  const [mins, setMins] = useState<number>(1);
  const [secs, setSecs] = useState<number>(1);
  const [btntext, setBtntext] = useState<string>("Start");
  const [toggleStart, setToggleStart] = useState<boolean>(false);
  const handleStart = (): void => {
    setToggleStart((prevToggle) => {
      const newToggle = !prevToggle;
      console.log(newToggle);
      return newToggle;
    });

    setBtntext((prevBtn) => {
      if (prevBtn === "Start") {
        return "Stop";
      } else {
        return "Start";
      }
    });
  };

  const keyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      console.log("enterkey pressed");
      handleStart();
      e.preventDefault();
    } else {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (toggleStart) {
      const interval = setInterval(() => {
        setSecs((prevSecs) => {
          if (prevSecs === 0 && mins === 0 && hours === 0) {
            return 0; // Stop the countdown
          }
          if (prevSecs > 0) {
            return prevSecs - 1;
          } else {
            setMins((prevMins) => {
              if (mins > 0) {
                return prevMins - 1;
              } else {
                setHours((prevHours) => {
                  if (hours > 0) {
                    return prevHours - 1;
                  }
                  return 0; // hrs
                });
              }
              return 59; //min
            });
          }
          return 59; //sec
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [toggleStart, mins, hours]);

  return (
    <>
      <div>
        <h1> Timer Here !</h1>
        <h2>
          {hours.toString().padStart(2, "0")}:{mins.toString().padStart(2, "0")}
          :{secs.toString().padStart(2, "0")}
        </h2>
        <button onClick={handleStart} onKeyDown={keyDown}>
          {btntext}
        </button>
      </div>
    </>
  );
}

export default App;
