import React from 'react';
import styles from './header.module.css';
import {useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../Auth/slices/authSlice';

export default function Header() {
  const {data: {first_name = "", last_name = ""}} = useSelector((state) => state.myInfo);
  const {isLogin} = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <ul className={styles.topnav}>
      <li>
        <NavLink to={'/'} className={styles.active} href="#home">
          Listing
        </NavLink>
      </li>
      <li>
        <NavLink to={'/chat'} className={styles.active} href="#home">
          Chat
        </NavLink>
      </li>

      {isLogin && (
        <>
          <li className={styles.right}>
            <a onClick={logoutHandler}>Logout</a>
          </li>
          <li className={styles.right}>
            <a href="#about">{first_name + ' ' + last_name}</a>
          </li>
        </>
      )}
    </ul>
  );
}
