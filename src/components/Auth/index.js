import React, {useState, useEffect} from 'react';
import styles from './auth.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {login} from './slices/authSlice';
import { useHistory } from 'react-router';

export default function Auth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {action, isLoading, error} = useSelector(state => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if(action === 'auth/login/fulfilled'){
      history.push('/chat')
    }
  }, [action, history])

  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    dispatch(
      login({
        username,
        password,
      })
    );
  };

  return (
    <div className={styles['login-page']}>
      <div className={styles['form']}>
        <form className={styles['login-form']}>
          <input
            type="text"
            value={username}
            onChange={usernameChangeHandler}
            placeholder="username"
          />
          <input
            type="password"
            value={password}
            onChange={passwordChangeHandler}
            placeholder="password"
          />
          <button onClick={loginHandler}>login</button>
          {/* <p className={styles['message']}>
            Not registered? <a href="#">Create an account</a>
          </p> */}
          {isLoading && <p style={{color: 'red'}}>loading ...</p>}
          {error && <p style={{color: 'red'}}>Login failed</p>}
        </form>
      </div>
    </div>
  );
}
