import React from 'react';
import styles from './PhigrosRks.module.css';

interface PhigrosRksProps {
  /** 要显示的RKS值 */
  value: string | number;
}

const PhigrosRks: React.FC<PhigrosRksProps> = ({ value }) => {
  return (
    <div className={styles.container}>
      <img 
        src="/assets/phigros-rks-plate.png"  // 默认图片路径
        alt="Phigros RKS Plate"
        className={styles.plateImage}
      />
      <div className={styles.rksValue}>
        {String(value)}
      </div>
    </div>
  );
};

export default PhigrosRks;