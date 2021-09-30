import { useEffect, useState } from "react";
import "./App.css";
import TicketListContainer from "./components/ticketList/TicketListContainer";
import UserSelection from "./components/userSelection/UserSelection";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelected] = useState(null);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users`)
      .then((response) => {
        if (response.status === 500) throw new Error("Something went wrong.");
        else return response.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <header className="App-header">Ticket to ride</header>
      <div className="mainLayout">
        <UserSelection
          users={users}
          selectedUser={selectedUser}
          handleSelect={setSelected}
          unselect={() => setSelected(null)}
        />
        <TicketListContainer users={users} selectedUser={selectedUser} />
      </div>
    </div>
  );
}

export default App;
