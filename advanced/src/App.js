import { useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Filter from './components/Filter';
import Home from './components/Home';
import Article from './components/Article';
import Login from './components/Login';

const bodyStyle = {
  maxWidth: 960,
  margin: '0 auto',
};

const headerStyle = {
  background: '#ff6600',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 5px',
};

const contentStyle = {
  background: '#FAC0B1',
};

const navStyle = {
  display: 'flex',
  alignItems: 'center',
};

function App() {
  const [filter, setFilter] = useState('');

  return (
    <BrowserRouter>
      <div>
        <div style={bodyStyle}>
          <nav style={headerStyle}>
            <h1>GraphQL</h1>
            <div style={navStyle}>
              <Filter filter={filter} setFilter={setFilter} />
              <Login />
            </div>
          </nav>

          <div style={contentStyle}>
            <Routes>
              <Route path='/' element={<Home filter={filter} />} />
              <Route exact path='/articles/:id' element={<Article />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
