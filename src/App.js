import React, { useState } from "react";
import { useApolloClient } from "@apollo/client";
import { GITHUB_ACCOUNTS } from "queries";
import { Header, SearchForm, Examples, Error, User } from "components";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasError, setHasError] = useState(false);
  const [users, setUsers] = useState([]);
  const [highestTotal, setHighestTotal] = useState(0);
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
      setUsers([...users, user]);
    } catch (error) {
      setHasError(true);
      setTimeout(() => {
        setHasError(false);
      }, 5000);
    }
    setSearchTerm("");
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleWinner = () => {
    setHighestTotal(0);
    users.map((user) => {
      const userTotal =
        user.repositories.totalCount +
        user.followers.totalCount +
        user.gists.totalCount;
      if (users.length > 1 && userTotal >= highestTotal) {
        setHighestTotal(userTotal);
        setWinnerId(user.databaseId);
      }
      return user;
    });
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
