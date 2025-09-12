import React, { useEffect, useState } from 'react';
import styles from './RotaenoRat.module.css';

interface RotaenoRatProps {
  /** 玩家Rating值 */
  value: number;
  /** 整体缩放比例 (可选) */
  scale?: number;
}

const RotaenoRat: React.FC<RotaenoRatProps> = ({
  value = 16.50,
  scale = 1
}) => {
  const [tier, setTier] = useState<number | string>(1);
  
  useEffect(() => {
    const tierRanges = [
      { max: 2, tier: 1 },
      { max: 3, tier: 2 },
      { max: 4, tier: 3 },
      { max: 5, tier: 4 },
      { max: 6, tier: 5 },
      { max: 7, tier: 6 },
      { max: 8, tier: 7 },
      { max: 9, tier: 8 },
      { max: 10, tier: 9 },
      { max: 11, tier: 10 },
      { max: 15, tier: 11 },
      { max: 16, tier: 15 },
      { max: 16.5, tier: 16 },
      { max: 17, tier: '16_5' },
      { max: 17.5, tier: 17 },
      { max: Infinity, tier: '17_5' }
    ];
    
    const currentTier = tierRanges.find(range => value < range.max)?.tier || 1;
    setTier(currentTier);
  }, [value]);

  const containerStyle = {
    transform: `scale(${scale})`,
    transformOrigin: 'left center'
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.ratingContainer} style={containerStyle}>
        <div className={styles.tier}>
          <img 
            src={`/assets/rtn/Rating Tier ${tier}.png`} 
            alt={`Tier ${tier}`}
            style={{ 
              width: `${40 * scale}px`,
              height: `${40 * scale}px`
            }}
          />
        </div>
        <div 
          className={`${styles.rating} ${styles[`tier${tier}`]}`}
          style={{ 
            height: `${28 * scale}px`,
            padding: `${3 * scale}px ${11 * scale}px ${3 * scale}px ${1 * scale}px`
          }}
        >
          <h3 style={{ fontSize: `${14 * scale}px` }}>Rating</h3>
          <p style={{ fontSize: `${16 * scale}px` }}>{value.toFixed(3)}</p>
        </div>
      </div>
    </div>
  );
};

export default RotaenoRat;