import { Content } from "./Components/Content";
import { Course } from "./Components/Course";
import { Header } from "./Components/Header";
import { Total } from "./Components/Total";

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'How to Adopt a Raven',
        exercises: 333,
        id: 4
      }
    ]
  };

  return (
    <>
      <Course course={course} />
    </>
  )
};

export default App;