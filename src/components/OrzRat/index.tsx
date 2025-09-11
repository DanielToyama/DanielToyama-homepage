import React from 'react';
import styles from './Style.module.css';

interface OrzmicRatProps {
  /** 要显示的RKS值 */
  value: string | number;
}

const OrzmicRat: React.FC<OrzmicRatProps> = ({ value }) => {
  return (
    <div className={styles.container}>
      <img 
        src="/assets/orz.png"  // 默认图片路径
        alt="Orzmic Plate"
        className={styles.plateImage}
      />
      <div className={styles.rksValue}>
        {String(value)}
      </div>
    </div>
  );
};

export default OrzmicRat;