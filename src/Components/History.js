import App from './../App';

export const History = (props) => {
    if (props.allClicks.length === 0) {
        return (
            <p>The app is used by clicking the buttons</p>
        );
    }

    return (
        <p>Button press history: {props.allClicks.join('-')}</p>
    );
    // const a = 'a';
    // if (a === 'a') {
    //     return (
    //         <p>Dentro l'if: {props.name}</p>
    //     )
    // }
    // return (
    //     <p>funzioni?</p>
    // )
};