import { Link } from 'react-router-dom';

const tagListStyle = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
};

const tagItemStyle = {
  padding: '5px',
  cursor: 'pointer',
};

const tags = ['react', 'graphql', 'typescript'];

function Filter({ filter, setFilter }) {
  return (
    <ul style={tagListStyle}>
      <li style={tagItemStyle}>Filter:</li>
      {tags.map((tag) => (
        <li
          key={tag}
          style={{
            ...tagItemStyle,
            ...(filter === tag && { fontWeight: 'bold' }),
          }}
        >
          <Link to={`/`} onClick={() => setFilter(tag)}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Filter;
