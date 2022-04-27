import { StatisticLine } from "./StatisticLine";

export const Statistics = (props) => {
    if (props.good === 0 && props.bad === 0 && props.neutral === 0) {
        return (
            <>
                <p>No feedback given.</p>
                <table>
                    <tbody>
                        <StatisticLine text='Good' value={props.good} />
                        <StatisticLine text='Neutral' value={props.neutral} />
                        <StatisticLine text='Bad' value={props.bad} />
                        <StatisticLine text='All' value={props.total} />
                        <StatisticLine text='Average' value={props.total / 3} />
                        <StatisticLine text='Positive review percentage' value={'--'} />
                    </tbody>
                </table>
            </>
        );
    }

    return (
        <>
            <p>Feedback:</p>
            <table>
                <tbody>
                    <StatisticLine text='Good' value={props.good} />
                    <StatisticLine text='Neutral' value={props.neutral} />
                    <StatisticLine text='Bad' value={props.bad} />
                    <StatisticLine text='All' value={props.total} />
                    <StatisticLine text='Average' value={props.total / 3} />
                    <StatisticLine text='Positive review percentage' value={props.good / props.total * 100 + ' %'} />
                </tbody>
            </table>
        </>
    );
};