import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../operations';
import {
  LoginUserMutation,
  LoginUserMutationVariables,
} from 'src/generated/types';

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

  const [loginUser, { data, loading, error }] = useMutation<
    LoginUserMutation,
    LoginUserMutationVariables
  >(LOGIN_USER);

  useEffect(() => {
    if (data?.login?.token) {
      localStorage.setItem('token', data.login.token);
      setShowModal(false);
    }
  }, [data]);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Login</button>

      <ReactModal
        isOpen={showModal}
        contentLabel='Login Modal'
        style={modalStyles}
      >
        <p>
          {loading && <span>Submitting...</span>}
          {error && <span>`Submission error! ${error.message}`</span>}

          <form
            onSubmit={(e) => {
              e.preventDefault();

              loginUser({ variables: { email, password } });
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
