import { useState, useEffect } from "react";
import OneTicket from "./OneTicket";



export default function OneTicketContainer(props) {
  const [astronaut, setastronaut] = useState([]);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    console.log(astronaut.length)
    if (astronaut.length===0 && isSelected) fetch(`${process.env.REACT_APP_API_URL}/astronaut/${props.ticketData.id}`)
    .then((response) => {
      if (response.status === 500) throw new Error("Something went wrong.");
      else return response.json();
    })
    .then((data) => setastronaut(data))
    .catch((err) => console.error(err));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelected]);

  return (
    <OneTicket
      ticketData={props.ticketData}
      astronaut={astronaut}
      isSelected={isSelected}
      handleSelect={()=>setIsSelected(!isSelected)}
      selectedUser={props.selectedUser}
      users={props.users}
    />
  );
}
