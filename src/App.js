import React, { useState } from "react";
import { useApolloClient } from "@apollo/client";
import { GITHUB_ACCOUNTS } from "queries";
import { Header, SearchForm, Examples, Error } from "components";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasError, setHasError] = useState(false);
  const client = useApolloClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasError(false);
    try {
      const {
        data: { user },
      } = await client.query({
        query: GITHUB_ACCOUNTS,
        variables: { name: searchTerm },
      });
      console.log(user);
    } catch (error) {
      setHasError(true);
      setTimeout(() => {
        setHasError(false);
      }, 5000)
    }
    setSearchTerm("");
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
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
      </div>
    </div>
  );
}

export default App;
