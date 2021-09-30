import { useState } from "react";
import styles from "./AstronautList.module.css";

export default function NewAstronautForm(props) {
  const { close, setRefreshTrigger } = props;
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const send = () => {
    const newAstronaut = {
      name: name,
      age: age,
      picture_url: pictureUrl,
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer oneJWT`,
      },
      body: JSON.stringify(newAstronaut),
    };
    fetch(`${process.env.REACT_APP_API_URL}/astronaut/`, requestOptions)
      .then((response) => {
        if (response.status !== 200) throw response.json();
        else return response.json();
      })
      .then(() => {
        window.alert("Astronaut has been created !");
        setName("");
        setAge("");
        setPictureUrl("");
        close();
        setRefreshTrigger();
      })
      .catch((err) => {
        err.then((err=>
          window.alert(err?.message?.message || "Server failed creating astronaut :/")
        ))
      })  
  };

  return (
    <div className={styles.NewAstronautForm}>
      <input
        placeholder="Name..."
        onChange={(e) => setName(e.target.value)}
        value={name}
      ></input>
      <input
        placeholder="age..."
        onChange={(e) => setAge(e.target.value)}
        value={age}
      ></input>
      <input
        placeholder="Picture url..."
        onChange={(e) => setPictureUrl(e.target.value)}
        value={pictureUrl}
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
