import { Link } from 'react-router-dom';

const tagListStyle = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  
};

const tagItemStyle = {
  padding: "0 10px 10px 0",
  cursor: 'pointer',
};

const textStyle = {
  color: "#F1F0ED"
};

const tags = ['react', 'graphql', 'typescript'];

function Filter({ filter, setFilter }) {
  return (
    <ul style={tagListStyle}>
      {tags.map((tag) => (
        <li
          key={tag}
          style={{
            ...tagItemStyle,
            ...(filter === tag && { fontWeight: 'bold' }),
          }}
        >
          <Link to={`/`} onClick={() => setFilter(tag)} style={textStyle}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Filter;
