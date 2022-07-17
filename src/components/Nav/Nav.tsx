import React, { FC } from 'react';
import styles from './Nav.module.scss';

interface NavProps {}

const Nav: FC<NavProps> = () => (
  <div className={styles.Nav} style={{textAlign: 'center', verticalAlign: 'middle'}  }>Pseudo navigation bar
  </div>
);

export default Nav;
