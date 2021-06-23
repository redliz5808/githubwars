import React, { useState } from "react";
import { useApolloClient } from "@apollo/client";
import { GITHUB_ACCOUNTS } from "queries";
import { Header, SearchForm, Examples, Error, User } from "components";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasError, setHasError] = useState(false);
  const [users, setUsers] = useState([]);
  const [winnerId, setWinnerId] = useState(0);
  const client = useApolloClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasError(false);
    const userExists = users.find((user) => user.login === searchTerm);
    if (userExists) return;
    try {
      const {
        data: { user },
      } = await client.query({
        query: GITHUB_ACCOUNTS,
        variables: { name: searchTerm },
      });
      const userTotal = {
        grandTotal:
          user.followers.totalCount +
          user.gists.totalCount +
          user.repositories.totalCount,
      };
      const newUser = Object.assign(userTotal, user);
      setUsers([...users, newUser]);
    } catch (error) {
      setHasError(true);
      setTimeout(() => {
        setHasError(false);
      }, 7000);
    }
    setSearchTerm("");
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleWinner = () => {
    if(users.length > 1) {
      const winner = users.reduce((prevUser, currentUser) => {
        return (prevUser.grandTotal > currentUser.grandTotal) ? prevUser : currentUser
      })
      setWinnerId(winner.databaseId);
    }
  };

  React.useEffect(() => {
    handleWinner();
  });

  const handleDelete = (id) => {
    const newUsers = users.filter((user) => user.databaseId !== id);
    setUsers(newUsers);
  };

  return (
    <div className="App">
      <Header />
      <div className="MainContent">
        <SearchForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          searchTerm={searchTerm}
        />
        <Examples />
        {hasError && <Error />}
        <div className="userCard">
          {users.map((user) => {
            return (
              <User
                key={user.databaseId}
                user={user}
                handleDelete={handleDelete}
                winnerId={winnerId}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
