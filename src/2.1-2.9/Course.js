import { Content } from "./Content";
import { Header } from "./Header";
import { Total } from "./Total";

export const Course = ({courses}) => {
    return (
        <>
            {courses.map(course => 
                <div key={course.id} className="aho">
                    <Header header={course.name} />
                    <Content parts={course.parts} />
                    <Total parts={course.parts} />
                </div>
            )}
            {/* <Content part1={parts[0].name} exercise2={parts[0].exercises} />
            <Content part2={parts[1].name} exercise2={parts[1].exercises} />
            <Content part3={parts[2].name} exercise3={parts[2].exercises} /> */}
        </>
    );
};