import { useState, useEffect } from "react";
import TicketList from "./TicketList";

export default function TicketListContainer(props) {
  const [ticketList, setTicketList] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/tickets/`)
      .then((response) => {
        if (response.status === 500) throw new Error("Something went wrong.");
        else return response.json();
      })
      .then((data) => setTicketList(data))
      .catch((err) => console.error(err));
  }, []);

  return <TicketList {...props} ticketList={ticketList} />;
}
