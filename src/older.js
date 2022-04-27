import { Content } from "./Components/Content";
import { Header } from "./Components/Header";
import { Total } from "./Components/Total";

const OlderApp = () => {
  const course = {
    name: "Half stack application development",
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      }, {
          name: 'Using props to pass data',
          exercises: 7
      }, {
          name: 'State of a component',
          exercises: 14
      }
    ]
  };

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      {/* <Content part1={parts[0].name} exercise2={parts[0].exercises} />
      <Content part2={parts[1].name} exercise2={parts[1].exercises} />
      <Content part3={parts[2].name} exercise3={parts[2].exercises} /> */}
    </>
  )
};

// Single state for right and left:
import { useState } from "react";
import { Button } from "./Components/Button";
import { Display } from "./Components/Display";

const App = () => {
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0
  });

  const handleLeftClick = () => {
    const newClicks = {
      ...clicks,
      left: clicks.left + 1
    };
    setClicks(newClicks);
  };

  const handleRightClick = () => {
    const newClicks = {
      ...clicks,
      right: clicks.right + 1
    };
    setClicks(newClicks);
  };

  return (
    <>
      {clicks.left}
      <button onClick={handleLeftClick}>
        left
      </button>
      <button onClick={handleRightClick}>
        right
      </button>
      {clicks.right}
    </>
  );
};

export default App;



// A more complex state, debugging react apps:
import { useEffect, useState } from "react"
import { Button } from "./Components/Button";
import { Display } from "./Components/Display";
import { History } from "./Components/History";

const App = () => {
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0
  });
  const [allClicks, setAll] = useState([]);

  const handleLeftClick = () => {
    console.log(allClicks, 'before');
    setAll(allClicks.concat('L'));
    setClicks({...clicks, left: clicks.left + 1});
    console.log(allClicks, 'after');
  };

  const handleReset = () => {
    setAll(allClicks.slice(500));
    setClicks({left: 0, right: 0});
    console.log(allClicks);
  }

  const hello = who => () => console.log('Hello, ' + who);

  const handleRightClick = () => {
    setAll(allClicks.concat('R'));
    setClicks({...clicks, right: clicks.right + 1});
    console.log(allClicks.length);
  };

  const [value, setValue] = useState(10);

  // function returning another function:
  // const setToValue = newValue => () => {
  //   console.log('value now', newValue);
  //   setValue(newValue);
  // }
  // With this in the render:
  // <button onClick={setToValue(1000)}>1000</button>

  // normal function:
  const setToValue = newValue => {
    console.log('value now', newValue);
    setValue(newValue);
  }
  // With this in the render:
  // <button onClick={() => setToValue(1000)}>1000</button>

  useEffect(() => {
    document.title = `${clicks.left} on the left`
  })

  return (
    <div>
      {clicks.left}
      <Button onClick={handleLeftClick} text='left' />
      <Button onClick={handleRightClick} text='right' />
      {clicks.right}
      <p>
        <button onClick={handleReset}>Reset counter</button>
      </p>
      <History allClicks={allClicks} />
      <button onClick={hello('Francesca')}>Yet another button</button>
      <button onClick={hello('Ade')}>Yet another button</button>
      <br></br>
      <Display value={value} />
      <button onClick={() => setToValue(1000)}>1000</button>
      <button onClick={() => setToValue(2)}>2</button>
      <button onClick={() => setToValue(79)}>79</button>
      <button onClick={() => setToValue(value + 1)}>increment</button>
    </div>
  );
};

export default App;