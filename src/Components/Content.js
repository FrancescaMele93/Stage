import { Part } from "./Part";

export const Content = ({parts}) => 
   <div>
      {parts.map(part => 
         <Part key={part.id} part={part} />
      )}
   </div>
;

/* <Part part={props.parts[0].name} exercise={props.parts[0].exercises} />
<Part part={props.parts[1].name} exercise={props.parts[1].exercises} />
<Part part={props.parts[2].name} exercise={props.parts[2].exercises} /> */