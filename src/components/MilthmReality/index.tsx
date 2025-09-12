// src/components/MilthmReality/index.tsx
import React from 'react';

interface MilthmRealityProps {
  score?: number | string;
  stars?: number; // 0-3颗星
  width?: number;
  height?: number;
  fontSize?: number;
  className?: string;
  whiteCapsuleWidth?: number;
  numberPadding?: number;
}

const MilthmReality: React.FC<MilthmRealityProps> = ({
  score = '0',
  stars = 0,
  width = 150,
  height = 36,
  fontSize = 13,
  className,
  whiteCapsuleWidth = 80,
  numberPadding = 5,
}) => {
  const borderRadius = height / 2;
  const formattedScore = typeof score === 'number' ? score.toFixed(2) : score;
  const starSize = fontSize - 4;
  const starTotalWidth = stars * (starSize + 1); // 星星总宽度+间距

  return (
    <div
      className={`milthm-reality ${className || ''}`}
      style={{
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: '#000',
        borderRadius: `${borderRadius}px`,
        overflow: 'hidden',
        fontFamily: '"Helvetica Neue", Arial, sans-serif',
        margin: '6px 0',
      }}
    >
      {/* 白色胶囊 */}
      <div
        className="milthm-reality-left"
        style={{
          position: 'absolute',
          left: '4px',
          top: '4px',
          width: `${whiteCapsuleWidth}px`,
          height: `${height - 8}px`,
          backgroundColor: '#fff',
          borderRadius: `${borderRadius - 4}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#000',
          fontWeight: 400,
          fontSize: `${fontSize}px`,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          padding: '0 2px',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{
          transform: 'scaleX(0.98)',
          display: 'inline-block',
          width: '100%',
          textAlign: 'center',
        }}>
          Reality
        </span>
      </div>
      
      {/* 右侧数值和星星 */}
      <div
        className="milthm-reality-right"
        style={{
          position: 'absolute',
          right: `${numberPadding}px`,
          top: '0',
          height: '100%',
          width: `calc(100% - ${whiteCapsuleWidth + 8}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* 数字和星星容器 */}
        <div style={{
          position: 'relative',
          height: stars > 0 ? '100%' : 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: stars > 0 ? '2px' : '0',
        }}>
          <div style={{
            fontWeight: 300,
            fontSize: `${fontSize + 1}px`,
            color: '#fff',
            lineHeight: 1,
          }}>
            {formattedScore}
          </div>
          
          {/* 星星容器 - 始终居中 */}
          {stars > 0 && (
            <div style={{
              position: 'relative',
              width: `${starTotalWidth}px`,
              height: `${starSize}px`,
              marginTop: '1px',
            }}>
              {[...Array(3)].map((_, i) => (
                <span 
                  key={i}
                  style={{
                    position: 'absolute',
                    left: `${i * (starSize + 2)}px`,
                    color: i < stars ? '#fff' : 'transparent',
                    fontSize: `${starSize}px`,
                    lineHeight: 1,
                  }}
                >
                  ★
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MilthmReality;