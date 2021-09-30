import styles from "./OneTicket.module.css";
export default function OneTicket(props) {
  const { ticketData, astronaut, isSelected, handleSelect, selectedUser, users } = props;
  const  author= props.users.find(user=>user.id===props.ticketData.user_id)||{}
  const modificationAllowed = (selectedUser && author.id===selectedUser.id)?true:false;

  return (
    <div className={styles.oneTicket} onClick={handleSelect}>
      <div className={styles.titleAndStatus}>
        <img src={author.avatar} alt='avatar' className={styles.smallAvatar}></img>
        <div>{ticketData.tittle}</div>
        <div>{ticketData.status}</div>
      </div>

      <div className={styles.description}>{ticketData.description}</div>
      {astronaut && astronaut.length>0 && isSelected ? <astronaut astronaut={astronaut} users={users}/> : null}
    </div>
  );
}

function astronaut(props) {

  return (
    <table className={styles.astronaut}>
      <tbody>
        <tr>
          <th>Date</th>
          <th>Author</th>
          <th>Comment</th>
        </tr>
        {props.astronaut.map((comment) => {
        const  author= props.users.find(user=>user.id===comment.user_id)||{}

          return(
          <tr key={comment.id}>
            <th>{new Date(comment.createdAt).toLocaleTimeString() }</th>
            <th>{author.user_name}</th>
            <th>{comment.description}</th>
          </tr>
        )})}
      </tbody>
    </table>
  );
}
