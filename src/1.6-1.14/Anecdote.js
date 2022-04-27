export const Anecdote = props => {
    return (
        <>
            <h2>{props.text}</h2>
            <p>{props.selAnecd}</p>
            <p>Votes: {props.selCopy}</p>
        </>
    );
};