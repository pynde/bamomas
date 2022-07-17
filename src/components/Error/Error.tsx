import React, { FC } from 'react';
import styles from './Error.module.scss';

interface ErrorProps {
}

const Error: FC<ErrorProps> = (props: ErrorProps) => (
  <div className={styles.Error}>
    Something went wrong :(
  </div>
);

export default Error;
