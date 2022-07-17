import React, { FC } from 'react';
import styles from './BatteryFilter.module.scss';

interface BatteryFilterProps {}

const BatteryFilter: FC<BatteryFilterProps> = () => (
  <div className={styles.BatteryFilter}>
    BatteryFilter Component
  </div>
);

export default BatteryFilter;
