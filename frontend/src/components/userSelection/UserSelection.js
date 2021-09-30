import styles from "./UserSelection.module.css";

export default function UserSelection(props) {
  const { users, ...rest } = props;

  return (
    <div className={styles.usersList}>
        Pick a name to connect with...
      {users.map((user) => (
        <OneUser key={user.id} user={user} {...rest} />
      ))}
    </div>
  );
}

function OneUser(props) {
  const { user, selectedUser, handleSelect, unselect } = props;
  const dynClass = [styles.oneUser, (selectedUser && selectedUser.id===user.id)?styles.hilight:null].join(' ');
  return (
    <div className={dynClass} onClick={() => handleSelect(user)}>
      <img src={user.avatar} alt="avatar" className={styles.avatar}></img>
      <div>{user.user_name}</div>
      {selectedUser===user.email? <button onClick={(e)=>{unselect(); e.stopPropagation()}} className={styles.disconnect}>Disconnect</button>:null}
    </div>
  );
}
