import { useState, useEffect } from "react";
import AstronautList from "./AstronautList";

export default function AstronautListContainer(props) {
  const [astronautList, setAstronautList] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState([]);

  useEffect(() => {
    fetchAstronauts();
  }, [refreshTrigger]);

  const fetchAstronauts = () => {
    fetch(`${process.env.REACT_APP_API_URL}/astronaut/`)
      .then((response) => {
        if (response.status === 500) throw new Error("Something went wrong.");
        else return response.json();
      })
      .then((data) => setAstronautList(data))
      .catch((err) => console.error(err));
  };

  return (
    <AstronautList
      setRefreshTrigger={setRefreshTrigger}
      handleSelect={props.handleSelect}
      astronautList={astronautList}
    />
  );
}
