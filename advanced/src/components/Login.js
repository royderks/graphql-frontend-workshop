import { useState } from 'react';
import ReactModal from 'react-modal';

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Login</button>

      <ReactModal
        isOpen={showModal}
        contentLabel='Login Modal'
        style={modalStyles}
      >
        <p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShowModal(false);
            }}
          >
            <input
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <button type='submit'>Login</button>
          </form>
        </p>

        <p>
          <button onClick={() => setShowModal(false)}>Close Modal</button>
        </p>
      </ReactModal>
    </div>
  );
}

export default Login;
