import { useState } from "react";
import styles from "./AstronautList.module.css";
import NewAstronautForm from "./NewAstronautForm";
export default function AstronautList(props) {
  const { astronautList, handleSelect, setRefreshTrigger } = props;
  const [openEditor, setOpenEditor] = useState(false);

  return (
    <div className={styles.astronautList}>
      <button
        className={styles.newAstronautButton}
        onClick={() => setOpenEditor(true)}
      >
        New astronaut
      </button>
      {openEditor ? (
        <NewAstronautForm
          close={() => setOpenEditor(false)}
          setRefreshTrigger={setRefreshTrigger}
        />
      ) : null}
      {astronautList?.length > 0 ? (

        [<p>Please select an item:</p>]
        .concat(astronautList.map((item) => (
          <OneItem
            key={item.id}
            handleSelect={() => handleSelect(item.id)}
            name={item.name}
          />
        )))
      ) : (
        <p>Please create an astronaut.</p>
      )}
    </div>
  );
}

function OneItem(props) {
  const { handleSelect, name } = props;

  return <div  className={styles.item} onClick={handleSelect}>{name}</div>;
}
