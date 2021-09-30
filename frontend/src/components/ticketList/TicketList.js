import { useState } from "react";
import OneTicketContainer from "../oneTicket/OneTicketContainer";
import styles from "./TicketList.module.css";
export default function TicketList(props) {
  const { ticketList, ...rest } = props;
  const [openEditor, setOpenEditor] = useState(false);

  return (
    <div className={styles.ticketList}>
      {props.selectedUser ? (
        <button
          className={styles.newTicketButton}
          onClick={() => setOpenEditor(true)}
        >
          New ticket
        </button>
      ) : null}
      {openEditor ? (
        <NewTicketForm
          close={() => setOpenEditor(false)}
          user={props.selectedUser}
        />
      ) : null}
      {ticketList.map((item) => (
        <OneTicketContainer key={item.id} ticketData={item} {...rest} />
      ))}
    </div>
  );
}

function NewTicketForm(props) {
  const { close, user } = props;
  const [tittle, setTittle] = useState("");
  const [description, setDescription] = useState("");
  const send = () => {
    const newTicket = {
      tittle: tittle,
      description: description,
      user_id: user.id,
      status: "toto",
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${user.email}` },
      body: JSON.stringify(newTicket),
    };
    fetch(`${process.env.REACT_APP_API_URL}/tickets/`, requestOptions)
      .then((response) => response.json())
      .then(() => {
        window.alert("Ticket has been created !");
        setTittle("");
        setDescription("");
        close();
      })
      .catch((err) => {
        window.alert("Server failed creating ticket :/");
        console.error(err);
      });
  };

  return (
    <div className={styles.newTicketForm}>
      <input
        placeholder="Title..."
        onChange={(e) => setTittle(e.target.value)}
        value={tittle}
      ></input>
      <input
        placeholder="Description..."
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      ></input>
      <button className={styles.cancelButton} onClick={close}>
        Cancel
      </button>
      <button className={styles.sendButton} onClick={send}>
        Create
      </button>
    </div>
  );
}
