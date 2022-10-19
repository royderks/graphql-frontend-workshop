import { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Filter from "./components/Filter";
import Home from "./components/Home";
import Article from "./components/Article";

const bodyStyle = {
  maxWidth: 960,
  margin: "0 auto",
};

const headerStyle = {
  background: "#B7DEBD",
  color: "#333333",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 5px",
};

const contentStyle = {
  background: "#F1F0ED",
};

function App() {
  const [filter, setFilter] = useState("");

  return (
    <BrowserRouter>
      <div>
        <div style={bodyStyle}>
          <nav style={headerStyle}>
            <h1>Here, take my upvote kind sir</h1>
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
