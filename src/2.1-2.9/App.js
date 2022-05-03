import { Course } from "./Components/Course";

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }, 
    {
      name: 'Raven breeding',
      id: 3,
      parts: [
        {
          name: 'Newbies',
          exercises: 5,
          id: 1
        },
        {
          name: 'Advanced',
          exercises: 6,
          id: 2
        }
      ]
    }
  ];

  return (
    <>
      <Course courses={courses} />
    </>
  )
};

export default App;