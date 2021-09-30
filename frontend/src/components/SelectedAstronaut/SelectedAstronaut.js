import styles from "./SelectedAstronaut.module.css";
export default function SelectedAstronaut(props) {
  const {
    astronaut,
    deleteOne,
    handleUpdate,
    updateMode,
    setUpdateMode,
    fieldName,
    setFieldName,
    fieldAge,
    setFieldAge,
    fieldPicture,
    setFieldPicture,
  } = props;


  if (!astronaut) return null;
  if (updateMode)
    return (
      <div className={styles.updatePannel}>
        <input
          placeholder="Name..."
          onChange={(e) => setFieldName(e.target.value)}
          value={fieldName}
        ></input>
        <input
          placeholder="age..."
          onChange={(e) => setFieldAge(e.target.value)}
          value={fieldAge}
        ></input>
        <input
          placeholder="Picture url..."
          onChange={(e) => setFieldPicture(e.target.value)}
          value={fieldPicture}
        ></input>
        <button className={styles.cancelButton} onClick={()=>setUpdateMode(false)}>
          Cancel
        </button>
        <button className={styles.sendButton} onClick={handleUpdate}>
          Update
        </button>
      </div>
    );
  else
    return (
      <div className={styles.oneAstronaut}>
        <img
          className={styles.smallPicture}
          src={astronaut.picture_url}
          alt="astronaut"
        />
        <div className={styles.details}>
          <div>Name: {astronaut.name}</div>
          <div>Age: {astronaut.age}</div>
          <button onClick={()=>setUpdateMode(true)}>Update</button>
          <button onClick={deleteOne}>Delete</button>
        </div>

        <div className={styles.description}>{astronaut.description}</div>
      </div>
    );
}
