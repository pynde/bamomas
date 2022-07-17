import React, { FC } from 'react';
import styles from './LoadingAnimation.module.scss';
import patteri from '../../../public/patteri.svg';
import BatterySVG from '../BatterySVG/BatterySVG';

interface LoadingAnimationProps {
}

const LoadingAnimation: FC<LoadingAnimationProps> = (props : LoadingAnimationProps) => (
  <div className={styles.LoadingAnimation}>
    <BatterySVG></BatterySVG>
    <span>Loading data...</span>
  </div>
);

export default LoadingAnimation;
