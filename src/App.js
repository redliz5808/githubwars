import React, { useState } from "react";
import { useApolloClient } from "@apollo/client";
import { GITHUB_ACCOUNTS } from "queries";
import { Header, SearchForm, Examples } from "components";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const client = useApolloClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { user },
      } = await client.query({
        query: GITHUB_ACCOUNTS,
        variables: { name: searchTerm },
      });
      console.log(user);
    } catch (error) {
      console.log(error);
    }
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
      </div>
    </div>
  );
}

export default App;
