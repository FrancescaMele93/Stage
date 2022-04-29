export const Total = ({parts}) => {
    // Use reduce to get the sum of courses' exercises
    const total = parts.reduce(
        (sum, parts) => {
            return sum + parts.exercises
        },
        0
    );

    return <p><strong>Total number of exercises: {total}</strong></p>
};