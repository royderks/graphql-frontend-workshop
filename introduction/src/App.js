import { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Filter from "./components/Filter";
import Home from "./components/Home";
import Article from "./components/Article";

const bodyStyle = {
  margin: "0 auto",
  background: "#F1F0ED"
};

const headerStyle = {
  background: "#4B6455",
  color: "#F1F0ED",
  display: "flow-root",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 18%",
  minWidth: "785px",
};

const contentStyle = {
  color: "#333333",
  padding: "0 18%",
  minWidth: "785px",
};

function App() {
  const [filter, setFilter] = useState("");

  return (
    <BrowserRouter>
      <div>
        <div style={bodyStyle}>
          <nav style={headerStyle}>
            <h1>GraphQL Todo List</h1>
            <Filter filter={filter} setFilter={setFilter} />
          </nav>

          <div style={contentStyle}>
            <Routes>
              <Route path="/" element={<Home filter={filter} />} />
              <Route exact path="/articles/:id" element={<Article />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
