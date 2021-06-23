const User = ({ user, winnerId, handleDelete }) => {
  const grandTotal =
    user.repositories.totalCount +
    user.followers.totalCount +
    user.gists.totalCount;
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
      <p className="total">Total: {grandTotal}</p>
    </div>
  );
};

export default User;
