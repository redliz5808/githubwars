import { useApolloClient } from "@apollo/client";
import { GITHUB_ACCOUNTS } from "queries";
import './App.css';

function App() {
  const client = useApolloClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data: {user}} = await client.query({
        query: GITHUB_ACCOUNTS,
        variables: { name: "redliz5808" },
      });
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="App">
      <header className="App-header">
      <form onSubmit={handleSubmit}><button>Submit</button></form>
      </header>
    </div>
  );
}

export default App;
