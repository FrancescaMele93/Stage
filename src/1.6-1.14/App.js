import { useState } from "react";
import { Anecdote } from "./Components/Anecdote";
import { Button } from "./Components/Button";
import { Header } from "./Components/Header";
import { Statistics } from "./Components/Statistics";

const App = () => {    
    const anecdotes = [
      'If it hurts, do it more often',
      'Adding manpower to a late software project makes it later!',
      'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      'Premature optimization is the root of all evil.',
      'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
    ];

    const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0, 0,]);
    // Make the votes state an object:
    // const [votes, setVotes] = useState({
    //   0: 0,
    //   1: 0,
    //   2: 0,
    //   3: 0,
    //   4: 0,
    //   5: 0,
    //   6: 0,
    //   7: 0,
    // });

    // Disable voting more than once without checking other anecdotes:
    const [disabled, setDisabled] = useState(false);
    // Change selected anecdote:
    const [selected, setSelected] = useState(0);
    
    const generateAnecdote = () => {
      setSelected(Math.floor(Math.random() * anecdotes.length));
      // setDisabled(false);
    };

    // Create copy of votes state:
    const votesCopy = [...votes];
    // const votesCopy = {...votes};

    const voteAnecdote = () => {
      // setDisabled(true);
      votesCopy[selected] += 1;
      setVotes(votesCopy);
    };

    // Find highest votes rate:
    const mostVotes = Math.max(...votesCopy);
    
    const [bad, setBad] = useState(0);
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);

    const giveFeedback = (vote, setVote) => {
      const voteSet = () => {
        setVote(vote + 1)
      };

      return voteSet;
    };

    const total = bad + good + neutral;

    const reset = () => {
      setBad(0);
      setGood(0);
      setNeutral(0);
    };

    return (
      <>
        <Anecdote text={'Anecdote of the day'} selAnecd={anecdotes[selected]} selCopy={votesCopy[selected]} />
        <Button onClick={generateAnecdote} text='Generate new random anecdote' />
        <button onClick={voteAnecdote} text='Vote' disabled={disabled}>Vote</button>
        <Anecdote text={'Today’s most-voted anecdote'} selAnecd={anecdotes[votesCopy.indexOf(mostVotes)]} selCopy={mostVotes} />
        <Header header={'Give feedback'} />
        <Button onClick={giveFeedback(good, setGood)} text='Good'></Button>
        <Button onClick={giveFeedback(neutral, setNeutral)} text='Neutral'></Button>
        <Button onClick={giveFeedback(bad, setBad)} text='Bad'></Button>
        <Header header={'Statistics'} />
        <Statistics good={good} bad={bad} neutral={neutral} total={total} />
        <Button onClick={reset} text='Reset feedback' />
      </>
    );
};

export default App;