const User = ({ user, winnerId, handleDelete }) => {
  return (
    <div className="cardContainer">
      <div className="close" onClick={() => handleDelete(user.databaseId)}>
        &times;
      </div>
      {winnerId === user.databaseId && <p className="winner">Winner</p>}
      <p className="username">{user.name}</p>
      <p className="stats">Followers: {user.followers.totalCount || 0}</p>
      <p className="stats">Repositories: {user.repositories.totalCount || 0}</p>
      <p className="stats">Gists: {user.gists.totalCount || 0}</p>
      <p className="total">Total: {user.grandTotal}</p>
    </div>
  );
};

export default User;
