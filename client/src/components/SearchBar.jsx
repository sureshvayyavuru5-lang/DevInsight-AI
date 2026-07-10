import { useState } from "react";
import "../styles/SearchBar.css";

function SearchBar({ onSearch }) {

  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.trim() !== "") {
      onSearch(username);
      setUsername("");
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Search GitHub Username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button type="submit">
        🔍 Search
      </button>

    </form>
  );
}

export default SearchBar;